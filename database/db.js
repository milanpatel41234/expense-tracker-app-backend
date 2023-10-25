const Sequelize = require("sequelize");

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: "mysql",
  }
);

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require("./users")(sequelize, Sequelize);
db.expense = require("./expense")(sequelize, Sequelize);
db.order = require("./order")(sequelize, Sequelize);
db.forgotpassword = require("./forgotPassword")(sequelize, Sequelize);
db.fileurl = require("./fileurl")(sequelize, Sequelize);

module.exports = db;
