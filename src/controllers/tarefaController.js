import * as tarefaService from '../services/tarefaService.js';

const NAO_ENCONTRADA = { error: 'Tarefa não encontrada' };

export const criar = async (req, res) => {
  const tarefa = await tarefaService.criarTarefa(req.body);
  return res.status(201).json(tarefa);
};

export const listar = async (req, res) => {
  const tarefas = await tarefaService.listarTarefas();
  return res.status(200).json(tarefas);
};

export const buscarPorId = async (req, res) => {
  const tarefa = await tarefaService.buscarTarefa(req.params.objectId);
  if (!tarefa) return res.status(404).json(NAO_ENCONTRADA);

  return res.status(200).json(tarefa);
};

export const atualizar = async (req, res) => {
  const tarefa = await tarefaService.atualizarTarefa(req.params.objectId, req.body);
  if (!tarefa) return res.status(404).json(NAO_ENCONTRADA);

  return res.status(200).json(tarefa);
};

export const remover = async (req, res) => {
  const removida = await tarefaService.removerTarefa(req.params.objectId);
  if (!removida) return res.status(404).json(NAO_ENCONTRADA);

  return res.status(200).json({ message: 'Tarefa removida com sucesso' });
};
