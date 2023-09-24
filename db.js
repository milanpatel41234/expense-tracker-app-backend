const Sequelize = require('sequelize');

const sequelize = new Sequelize('expenseApp', 'root', '99770@Mysql',{
    host: 'localhost',
    port: 3306,
    dialect: 'mysql',
});

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require('./users')(sequelize,Sequelize)
db.expense = require('./expense')(sequelize,Sequelize);

module.exports = db;