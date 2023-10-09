const jwt = require('jsonwebtoken');
const db = require('../database/db');
const user = db.user

module.exports = (req , res , next) => {
    const token = req.header('token');
   const decodedToken = jwt.verify(token,process.env.JWT_KEY);
   const userEmail = decodedToken.userEmail;
 user.findByPk(userEmail)
 .then((usr)=>{
    if(usr.ispremium){
        req.user = usr;
        next();
    }else{
       return res.json({message:'user is not authorized',isPremiumUser:false});
    }
 })
.catch((err)=>{ console.log('errrrr',err)
    res.status(405).send({success: false,})
});
}