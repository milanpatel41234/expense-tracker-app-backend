const bcrypt = require("bcrypt");
const Users = require('../../database/users')
const Forgotpassword = require('../../database/forgotPassword')

module.exports = async (req, res) => {
  const token = req.params.token;
  const newPassword = req.body.newPassword;
  const confirmPassword = req.body.confirmPassword;

  if (confirmPassword !== newPassword) {
    return res.send("new password and confirm password not match");
  } else if (newPassword.length < 8) {
    return res.send("password length must be 8 characters or more");
  }

  const getUser = await Forgotpassword.findOne({id:token});
  if (getUser && getUser.isactive) {
    try {
      bcrypt.hash(newPassword, 10, async (err, hash) => {
        if (err) throw new Error(err);
        else {
          const usr = Users.update(
            { email: getUser.userEmail },
            {$set: {password: hash}}
          );
          getUser.isactive = false;
          await getUser.save();
         
            return res.send("password updated successfully");
          }
        });
      } catch (error) {
      return res.send("something failed , please try again after some time");
      
    }
  } else {
    return res.status(401).send("Link expired or invalid");
  }
};
