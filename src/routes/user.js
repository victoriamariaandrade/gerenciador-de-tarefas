import { Router } from 'express';

import validate from '../middlewares/validate.js';
import { userIdParamSchema, criarUserSchema } from '../schemas/userSchema.js';

const router = Router();

router.get('/', async (req, res) => {
  const users = await req.context.models.User.findAll();
  return res.json(users);
});

router.get('/:userId', validate({ params: userIdParamSchema }), async (req, res) => {
  const user = await req.context.models.User.findByPk(req.params.userId, {
    include: req.context.models.Message,
  });
  if (!user) return res.status(404).json({ error: 'Usuário não encontrado' });

  return res.json(user);
});

router.post('/', validate({ body: criarUserSchema }), async (req, res) => {
  const user = await req.context.models.User.create(req.body);
  return res.status(201).json(user);
});

router.delete('/:userId', validate({ params: userIdParamSchema }), async (req, res) => {
  const removidos = await req.context.models.User.destroy({
    where: { id: req.params.userId },
  });
  if (!removidos) return res.status(404).json({ error: 'Usuário não encontrado' });

  return res.json({ message: 'Usuário removido com sucesso' });
});

export default router;
