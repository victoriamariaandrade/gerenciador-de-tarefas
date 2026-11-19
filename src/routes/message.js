import { Router } from 'express';

import validate from '../middlewares/validate.js';
import { messageIdParamSchema, criarMessageSchema } from '../schemas/messageSchema.js';

const router = Router();

router.get('/', async (req, res) => {
  const messages = await req.context.models.Message.findAll();
  return res.json(messages);
});

router.get('/:messageId', validate({ params: messageIdParamSchema }), async (req, res) => {
  const message = await req.context.models.Message.findByPk(req.params.messageId);
  if (!message) return res.status(404).json({ error: 'Mensagem não encontrada' });

  return res.json(message);
});

router.post('/', validate({ body: criarMessageSchema }), async (req, res) => {
  const message = await req.context.models.Message.create(req.body);
  return res.status(201).json(message);
});

router.delete('/:messageId', validate({ params: messageIdParamSchema }), async (req, res) => {
  const removidas = await req.context.models.Message.destroy({
    where: { id: req.params.messageId },
  });
  if (!removidas) return res.status(404).json({ error: 'Mensagem não encontrada' });

  return res.json({ message: 'Mensagem removida com sucesso' });
});

export default router;
