module.exports = (sequelize, Sequelize) => {
    const order = sequelize.define("order", {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      orderid: { type: Sequelize.STRING, allowNull: false },
      status:Sequelize.STRING,
      paymentid:Sequelize.STRING,
    });
    return order;
  };