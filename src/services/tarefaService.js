import models from '../models/index.js';

const { Tarefa } = models;

export const criarTarefa = async ({ descricao, concluida }) => {
  return Tarefa.create({ descricao, concluida });
};

export const listarTarefas = async () => {
  return Tarefa.findAll({ order: [['createdAt', 'ASC']] });
};

export const buscarTarefa = async (objectId) => {
  return Tarefa.findByPk(objectId);
};

// Retorna null quando a tarefa não existe.
export const atualizarTarefa = async (objectId, dados) => {
  const tarefa = await Tarefa.findByPk(objectId);
  if (!tarefa) return null;

  return tarefa.update(dados);
};

// Retorna false quando a tarefa não existe.
export const removerTarefa = async (objectId) => {
  const removidas = await Tarefa.destroy({ where: { objectId } });
  return removidas > 0;
};
