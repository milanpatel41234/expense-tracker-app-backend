const db = require("../db");
const user = db.user;

const login = (req, res) => {
  const userEmail = req.query.email;
  const userPassword = req.query.password;
  console.log(userEmail, userPassword);
  user
    .findOne({
      where: {
        email: userEmail,
      },
    })
    .then((user) => {
      if (user) {
        if (user.password === userPassword) {
          res.send({ message: "Login successfully", login: true });
        } else {
          res.send({ message: "Password incorrect", login: false });
        }
      } else {
        res.send({ message: "This email doesn't exists", login: false });
      }
    })
    .catch((error) => {
      res
        .status(500)
        .send({
          message: "Some error occured, Please try after some time.",
          login: false,
        });
    });
};
module.exports = login;
