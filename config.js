const mongoose = require('mongoose');

module.exports = async()=>{
 await mongoose.connect(`mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@cluster0.wyvpikf.mongodb.net/expense-app`);
}
