const db = require("../database/db");
const bcrypt = require("bcrypt");
const user = db.user;
const jwt = require("jsonwebtoken");

const login = (req, res) => {
  const key = "mykey";
  const userEmail = req.body.email;
  const userPassword = req.body.password;

const generateToken = ()=>{
   return jwt.sign({userEmail}, key)
}

  user.findOne({
      where: {
        email: userEmail,
      },
    })
    .then(async (user) => {
      if (user) {
        const result = await bcrypt.compare(userPassword, user.password);
        if (result) {
          res.send({ message: "Login successfully", login: true , token:generateToken()});
        } else {
          res.status(401).send({ message: "Password incorrect", login: false });
        }
      } else {
        res
          .status(404)
          .send({ message: "This email doesn't exists", login: false });
      }
    })
    .catch((error) => {
      res.status(500).send({
        message: "Some error occured, Please try after some time.",
        login: false,
      });
    });
};
module.exports = login;
