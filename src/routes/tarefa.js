import { Router } from 'express';

import * as tarefaController from '../controllers/tarefaController.js';
import validate from '../middlewares/validate.js';
import {
  objectIdParamSchema,
  criarTarefaSchema,
  atualizarTarefaSchema,
} from '../schemas/tarefaSchema.js';

const router = Router();

router.post('/', validate({ body: criarTarefaSchema }), tarefaController.criar);
router.get('/', tarefaController.listar);
router.get('/:objectId', validate({ params: objectIdParamSchema }), tarefaController.buscarPorId);
router.put(
  '/:objectId',
  validate({ params: objectIdParamSchema, body: atualizarTarefaSchema }),
  tarefaController.atualizar,
);
router.delete('/:objectId', validate({ params: objectIdParamSchema }), tarefaController.remover);

export default router;
