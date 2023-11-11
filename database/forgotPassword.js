const mongoose = require('mongoose');

const forgotpasswordSchema = new mongoose.Schema({
  isactive:Boolean,
  userEmail:String,
  id:String,
})
module.exports = mongoose.model('forgotpassword', forgotpasswordSchema)


