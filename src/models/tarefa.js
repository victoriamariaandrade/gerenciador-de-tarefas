const getTarefaModel = (sequelize, { DataTypes }) => {
  const Tarefa = sequelize.define(
    'tarefa',
    {
      objectId: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4, // UUID gerado pelo back-end
        primaryKey: true,
      },
      descricao: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      concluida: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
    },
    {
      tableName: 'tarefas',
    },
  );

  return Tarefa;
};

export default getTarefaModel;
