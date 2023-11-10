const bcrypt = require("bcrypt");
const Users = require('../database/users')
const jwt = require("jsonwebtoken");

const login = async(req, res) => {
  const userEmail = req.body.email;
  const userPassword = req.body.password;

const generateToken = ()=>{
   return jwt.sign({userEmail}, process.env.JWT_KEY)
}
try {
  const user = await Users.findOne({email:userEmail});
  if(!user){return res.status(404).send({message: "This email is not registered", login: false})}

  const result = await bcrypt.compare(userPassword, user.password);
  if (result) {
    res.send({ message: "Login successfully", login: true , token:generateToken()});
  } else {
    res.status(401).send({ message: "Password incorrect", login: false });
  }

} catch (error) {
  console.log(error);
  res.status(500).send({
    message: "Some error occured, Please try after some time.",
    login: false,
  });
}
}
module.exports = login;
