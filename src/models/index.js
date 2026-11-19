import 'dotenv/config';
import pg from 'pg';
import { Sequelize } from 'sequelize';

import getUserModel from './user.js';
import getMessageModel from './message.js';
import getTarefaModel from './tarefa.js';

if (!process.env.DATABASE_URL) {
  throw new Error('A variável de ambiente DATABASE_URL não foi definida.');
}

// O NeonDB exige SSL; o Postgres local (Docker) não.
const useSsl = process.env.DATABASE_SSL !== 'false';

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'postgres',
  dialectModule: pg, // necessário para o bundle da Vercel encontrar o driver
  logging: false,
  dialectOptions: useSsl
    ? { ssl: { require: true, rejectUnauthorized: false } }
    : {},
});

const models = {
  User: getUserModel(sequelize, Sequelize),
  Message: getMessageModel(sequelize, Sequelize),
  Tarefa: getTarefaModel(sequelize, Sequelize),
};

Object.keys(models).forEach((key) => {
  if ('associate' in models[key]) {
    models[key].associate(models);
  }
});

export { sequelize };

export default models;
