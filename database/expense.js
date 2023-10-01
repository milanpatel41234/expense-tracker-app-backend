module.exports = (sequelize, Sequelize) => {
  const expense = sequelize.define("expense", {
    id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    amount: { type: Sequelize.INTEGER, allowNull: false },
    date: { type: Sequelize.STRING, allowNull: false },
    category: { type: Sequelize.STRING, allowNull: false },
    details: { type: Sequelize.STRING, allowNull: false },
  });
  return expense;
};
