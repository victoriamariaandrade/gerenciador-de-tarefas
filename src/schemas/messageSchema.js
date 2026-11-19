import { z } from 'zod';

export const messageIdParamSchema = z.object({
  messageId: z.coerce.number().int().positive({ error: 'messageId deve ser um número inteiro positivo' }),
});

export const criarMessageSchema = z.object({
  text: z
    .string({ error: 'text é obrigatório e deve ser uma string' })
    .trim()
    .min(1, { error: 'text não pode ser vazio' }),
  userId: z.number({ error: 'userId é obrigatório e deve ser um número' }).int().positive(),
});
