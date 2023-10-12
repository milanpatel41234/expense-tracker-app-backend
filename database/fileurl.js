module.exports = (sequelize, Sequelize) => {
    const fileurl = sequelize.define("fileurl", {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      url: { type: Sequelize.STRING, allowNull: false },
    });
    return fileurl;
  };
  