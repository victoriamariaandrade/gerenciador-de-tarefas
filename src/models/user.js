const getUserModel = (sequelize, { DataTypes }) => {
  const User = sequelize.define('user', {
    username: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
  });

  User.associate = (models) => {
    User.hasMany(models.Message, { onDelete: 'CASCADE' });
  };

  User.findByLogin = async (login) => {
    return User.findOne({
      where: { username: login },
    });
  };

  return User;
};

export default getUserModel;
