const db = require('../db');
const user = db.user

const signup = (req,res)=>{
    const newuser = req.body
user.create(newuser)
.then(result=>res.send(result))
.catch(err =>{
    console.log(err.name)
    if(err.name === 'SequelizeUniqueConstraintError'){
        return res.send({message:'This email already exists',error: err})
    }
    res.status(500).send({message:'Some error occured, Please try after some time.',error: err})
});
}
module.exports = signup;