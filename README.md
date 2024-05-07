# API Rest

Olá, tudo bem?! Esta API foi construída utilizando fastify que é um pacote de rotas que tem suporte ao TypeScript, que no caso foi a linguagem utilizada no projeto. Estou aprendendo a documentar, logo mais dou uma caprichada por aqui, VLWS


# Requisitos
# RF

- [x] O usuário deve poder cirar uma nova transação;
- [x] O usuário deve poder obter um resumo da sua conta;
- [x] O usuário deve poder listar todas transações que já ocorreram;
- [x] O usuário deve poder visualizar uma transção única;

# RN

- [x] A transação pode ser do tipo crédito que somará ao valor total, ou débito subtrairá;
- [ ] Deve ser possível identificarmos o usuário entre as requisições;
- [x] O usuário só pode visualizar transações o qual ele criou;


## Stack utilizada


**Back-end:** Node, Fastify, TypeScript


## Funcionalidades

- Cria uma transação [POST]
- Você pode listar as transações criadas [[GET] /transactions]
- Soma dos valores das transações criadas [[GET] /transactions/summary]
- Procura transação por ID [[GET] /transactions:id]


## Autores

- [@cleysonseveriano](https://www.github.com/cleysonseveriano)