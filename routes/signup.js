const Users = require('../database/users')
const bcrypt = require("bcrypt");


const signup = async(req, res) => {
  const name = req.body.name;
  const email = req.body.email;
  const password = req.body.password;
  try {
    const findUser = await Users.findOne({email})
    if(findUser){return res.send({message: "This email already exists"})}
    bcrypt.hash(password, 10, async(err, hash) => {
      if (err) throw new Error(err);
      else {
        const data = new Users({ name, email, ispremium:false, password: hash,total:0})
        const result = await data.save();
       return res.send(result);
      }
    });
  } catch (err) {
    res.status(500).send({
      message: "Some error occured, Please try after some time.",
      error: err,
    });
  }
};
module.exports = signup;
