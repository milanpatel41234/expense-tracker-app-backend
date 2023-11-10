const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  orderid:String,
   status:String,
      paymentid:String,
})
module.exports = mongoose.model('order', orderSchema)

//       id: {
//         type: Sequelize.INTEGER,
//         allowNull: false,
//         primaryKey: true,
//         autoIncrement: true
//       },
//       orderid: { type: Sequelize.STRING, allowNull: false },
//       status:Sequelize.STRING,
//       paymentid:Sequelize.STRING,
//     });
//     return order;
//   };