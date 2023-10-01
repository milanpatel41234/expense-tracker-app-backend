const db = require("../database/db");
const bcrypt = require("bcrypt");
const user = db.user;

const signup = (req, res) => {
  const name = req.body.name;
  const email = req.body.email;
  const password = req.body.password;
  try {
    bcrypt.hash(password, 10, (err, hash) => {
      if (err) throw new Error(err);
      else {
        user
          .create({ name, email, password: hash })
          .then((response) => {
            res.send(response);
          })
          .catch((err) => {
            if (err.name === "SequelizeUniqueConstraintError") {
              return res.send({
                message: "This email already exists",
                error: err,
              });
            }
            res.status(500).send({
              message: "Some error occured, Please try after some time.",
              error: err,
            });
          });
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
