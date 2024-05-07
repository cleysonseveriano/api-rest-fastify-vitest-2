// Arquivo de Definição de tipos
import { Knex } from 'knex'

declare module 'knex/types/tables' {
    export interface Tables {
        transactions: {
            id: string,
            title: string,
            amount: number,
            crewated_at: string,
            session_id?: number
        }
    }
}