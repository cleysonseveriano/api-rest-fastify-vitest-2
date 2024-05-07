import { FastifyInstance } from "fastify"
import { z } from "zod"
import crypto, { randomUUID } from 'node:crypto'
import { knex } from "../database"
import { error } from "node:console"
import { checkSessionIdExists } from "../middlewares/check-session-id-exists"

export async function transactionsRoutes (app: FastifyInstance) {
    // app.addHook('preHandler', checkSessionIdExists)

    app.get('/' ,{
        preHandler: [checkSessionIdExists]
    } ,async (req, reply) => {
        const { sessionId } = req.cookies

        const transactions = await knex('transactions')
            .where('session_id', sessionId)
            .select()
        return { transactions }
    })

    app.get('/:id', {
        preHandler: [checkSessionIdExists]
    }, async (req, reply) => {
        const getTransactionParamsSchema = z.object({
            id: z.string().uuid()
        })

        const { id } = getTransactionParamsSchema.parse(req.params)

        const { sessionId } = req.cookies

        const transaction = await knex('transactions')
            .where('id', id)
            .andWhere('session_id', sessionId)
            .first()

        return { transaction }
    })

    app.get('/summary', {
        preHandler: [checkSessionIdExists]
    }, async (req, reply) => {
        const { sessionId } = req.cookies

        const summary = await knex('transactions')
            .where('session_id', sessionId)
            .sum('amount', { as: 'amount' })
            .first()

        return { summary }
    })


    app.post('/', async (req,reply) => {
        const createTransactionBodySchema = z.object({
            title: z.string(),
            amount: z.number(),
            type: z.enum(['credit', 'debit'])
        }) 

        // Validando dados do corpo da requisição com o zod
        const { title, amount, type } = createTransactionBodySchema.parse(req.body)

        let sessionId = req.cookies.sessionId

        if(!sessionId) {
            sessionId = randomUUID()

            reply.cookie('sessionId', sessionId, {
                path: '/',
                maxAge: 60 * 60 * 24 * 7 // 7 dias
            })
        }

        await knex('transactions')
            .insert({
                id: crypto.randomUUID(),
                title,
                amount: type === 'credit' ? amount : amount * -1,
                session_id: sessionId
            })

        return reply.status(201).send()
    })
}
