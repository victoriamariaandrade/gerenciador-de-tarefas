import { z } from 'zod';

export const userIdParamSchema = z.object({
  userId: z.coerce.number().int().positive({ error: 'userId deve ser um número inteiro positivo' }),
});

export const criarUserSchema = z.object({
  username: z
    .string({ error: 'username é obrigatório e deve ser uma string' })
    .trim()
    .min(1, { error: 'username não pode ser vazio' }),
});
