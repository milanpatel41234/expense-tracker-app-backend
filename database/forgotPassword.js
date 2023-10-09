module.exports = (sequelize, Sequelize) => {
    const forgotpassword = sequelize.define("forgotpassword", {
      id: {
        type: Sequelize.STRING,
        allowNull: false,
        primaryKey: true,
      },
      isactive:Sequelize.BOOLEAN,
    });
    return forgotpassword;
  };