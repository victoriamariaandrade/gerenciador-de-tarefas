# express-proj-gerenciador-tarefas

API RESTful com **Node.js + Express**, **Sequelize** (PostgreSQL no **NeonDB**), validação com **Zod** e deploy na **Vercel**. Contém os recursos `users`, `messages` e `tarefas`.

## Estrutura

```
src/
  controllers/tarefaController.js   respostas HTTP e códigos de status
  services/tarefaService.js         regras de negócio (CRUD)
  models/                           modelos Sequelize (user, message, tarefa) e conexão
  routes/                           rotas /users, /messages e /tarefas
  schemas/                          schemas Zod de validação
  middlewares/                      validação e tratamento de erros
  index.js                          inicializa o Express e conecta as rotas
```

## Como rodar

```bash
npm install
cp .env.sample .env   # preencha DATABASE_URL com a string de conexão do NeonDB
npm run dev
```

As tabelas são criadas automaticamente (`sequelize.sync()`) na primeira requisição.

## Endpoints de tarefas

| Método | Rota                 | Corpo                                   | Sucesso | Erros   |
|--------|----------------------|-----------------------------------------|---------|---------|
| POST   | `/tarefas`           | `{ "descricao": "...", "concluida": false }` | 201 | 400 |
| GET    | `/tarefas`           | —                                       | 200     | —       |
| GET    | `/tarefas/:objectId` | —                                       | 200     | 400, 404 |
| PUT    | `/tarefas/:objectId` | `descricao` e/ou `concluida`            | 200     | 400, 404 |
| DELETE | `/tarefas/:objectId` | —                                       | 200     | 400, 404 |

- `objectId` é um UUID gerado pelo back-end.
- `descricao` é obrigatória no POST; `concluida` é opcional (padrão `false`).
- `objectId` com formato inválido retorna 400; UUID válido inexistente retorna 404.

## Deploy na Vercel

1. Importe o repositório na Vercel.
2. Em **Settings → Environment Variables**, crie `DATABASE_URL` com a string do NeonDB.
3. Faça o deploy. O `vercel.json` publica `src/index.js` como Serverless Function.

## Postman

Importe `express-proj-gerenciador-tarefas.postman_collection.json` e ajuste a variável de coleção `baseUrl` para a URL da Vercel.
