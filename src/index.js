import 'dotenv/config';
import cors from 'cors';
import express from 'express';

import models, { sequelize } from './models/index.js';
import routes from './routes/index.js';
import errorHandler from './middlewares/errorHandler.js';

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Sincroniza as tabelas uma única vez por instância (inclusive na Vercel,
// onde o servidor não chama listen e cada cold start cria uma nova instância).
let dbReady;
const syncDatabase = () => {
  dbReady ??= sequelize.sync().catch((err) => {
    dbReady = undefined;
    throw err;
  });
  return dbReady;
};

app.use(async (req, res, next) => {
  await syncDatabase();
  req.context = { models };
  next();
});

app.get('/', (req, res) => {
  res.json({
    message: 'API express-proj-gerenciador-tarefas no ar',
    endpoints: ['/users', '/messages', '/tarefas'],
  });
});

app.use('/users', routes.user);
app.use('/messages', routes.message);
app.use('/tarefas', routes.tarefa);

app.use((req, res) => {
  res.status(404).json({ error: 'Rota não encontrada' });
});

app.use(errorHandler);

if (!process.env.VERCEL) {
  const port = process.env.PORT || 3000;
  await syncDatabase();
  console.log('Banco conectado e tabelas sincronizadas');
  app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
  });
}

export default app;
