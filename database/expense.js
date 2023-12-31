const mongoose = require('mongoose');

const expenseSchema = new mongoose.Schema({
  amount:Number,
  date:String,
  category:String,
  details:String,
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user'
  },
})
module.exports = mongoose.model('expense', expenseSchema)



// module.exports = (sequelize, Sequelize) => {
//   const expense = sequelize.define("expense", {
//     id: {
//       type: Sequelize.INTEGER,
//       allowNull: false,
//       primaryKey: true,
//       autoIncrement: true,
//     },
//     amount: { type: Sequelize.INTEGER, allowNull: false },
//     date: { type: Sequelize.STRING, allowNull: false },
//     category: { type: Sequelize.STRING, allowNull: false },
//     details: { type: Sequelize.STRING, allowNull: false },
//   });
//   return expense;
// };
