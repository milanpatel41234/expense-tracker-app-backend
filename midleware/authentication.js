const jwt = require('jsonwebtoken');
const db = require('../database/db');
const user = db.user

module.exports = (req , res , next) => {
    const token = req.header('token');
    if(!token)  return res.json({message:'user is not authorized',isPremiumUser:false});
   const {userEmail} = jwt.verify(token,process.env.JWT_KEY);
 
 user.findByPk(userEmail)
 .then((usr)=>{
 req.user = usr;
 next();
 })
.catch((err)=>{
    res.status(405).send({success: false,})
});
}