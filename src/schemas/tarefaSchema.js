import { z } from 'zod';

export const objectIdParamSchema = z.object({
  objectId: z.uuid({ error: 'objectId deve ser um UUID válido' }),
});

export const criarTarefaSchema = z.object({
  descricao: z
    .string({ error: 'descricao é obrigatória e deve ser uma string' })
    .trim()
    .min(1, { error: 'descricao não pode ser vazia' }),
  concluida: z
    .boolean({ error: 'concluida deve ser um boolean' })
    .optional()
    .default(false),
});

export const atualizarTarefaSchema = z
  .object({
    descricao: z
      .string({ error: 'descricao deve ser uma string' })
      .trim()
      .min(1, { error: 'descricao não pode ser vazia' })
      .optional(),
    concluida: z.boolean({ error: 'concluida deve ser um boolean' }).optional(),
  })
  .refine(
    (data) => data.descricao !== undefined || data.concluida !== undefined,
    { error: 'Informe descricao e/ou concluida para atualizar' },
  );
