// Valida (e normaliza) req.params e/ou req.body com schemas do Zod.
// Em caso de erro, responde 400 com a lista de problemas encontrados.
const validate = (schemas) => (req, res, next) => {
  for (const key of ['params', 'body']) {
    if (!schemas[key]) continue;

    const result = schemas[key].safeParse(req[key] ?? {});

    if (!result.success) {
      return res.status(400).json({
        error: 'Dados inválidos',
        details: result.error.issues.map((issue) => ({
          campo: issue.path.join('.') || key,
          mensagem: issue.message,
        })),
      });
    }

    req[key] = result.data;
  }

  return next();
};

export default validate;
