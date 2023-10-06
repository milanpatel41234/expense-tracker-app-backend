const jwt = require('jsonwebtoken');
const db = require('../database/db');
const user = db.user

module.exports = (req , res , next) => {
    const token = req.header('token');
   const decodedToken = jwt.verify(token,'mykey');
   const userEmail = decodedToken.userEmail;
 user.findByPk(userEmail)
 .then((usr)=>{
 req.user = usr;
 next();
 })
.catch((err)=>{ console.log('errrrr',err)
    res.status(405).send({success: false,})
});
}