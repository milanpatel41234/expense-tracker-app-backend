const db = require('../db');
const user = db.user

const signup = (req,res)=>{
    const newuser = req.body
user.create(newuser)
.then(result=>res.send(result))
.catch(err =>res.status(500).send({message:'Error creating user',error: err}));
}
module.exports = signup;