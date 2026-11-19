// eslint-disable-next-line no-unused-vars
const errorHandler = (err, req, res, next) => {
  if (err.type === 'entity.parse.failed') {
    return res.status(400).json({ error: 'JSON inválido no corpo da requisição' });
  }

  if (err.name === 'SequelizeValidationError' || err.name === 'SequelizeUniqueConstraintError') {
    return res.status(400).json({
      error: 'Dados inválidos',
      details: err.errors.map((e) => ({ campo: e.path, mensagem: e.message })),
    });
  }

  if (err.name === 'SequelizeForeignKeyConstraintError') {
    return res.status(400).json({ error: 'Registro relacionado não encontrado' });
  }

  console.error(err);
  return res.status(500).json({ error: 'Erro interno do servidor' });
};

export default errorHandler;
