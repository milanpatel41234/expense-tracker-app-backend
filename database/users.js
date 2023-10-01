module.exports = (sequelize, Sequelize) => {
  const user = sequelize.define("user", {
    name: { type: Sequelize.STRING, allowNull: false },
    email: { type: Sequelize.STRING, allowNull: false, primaryKey: true },
    password: { type: Sequelize.STRING, allowNull: false },
    ispremium:{ type: Sequelize.BOOLEAN,}
  });
  return user;
};
