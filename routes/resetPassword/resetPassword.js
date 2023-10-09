const { user, forgotpassword , sequelize } = require("../../database/db");
const bcrypt = require("bcrypt");

module.exports = async (req, res) => {
  const token = req.params.token;
  const newPassword = req.body.newPassword;
  const confirmPassword = req.body.confirmPassword;

  if (confirmPassword !== newPassword) {
    return res.send("new password and confirm password not match");
  } else if (newPassword.length < 8) {
    return res.send("password length must be 8 characters or more");
  }

  const findUser = forgotpassword.findByPk(token);
  const trans = sequelize.transaction();
  const [getUser, transaction] = await Promise.all([findUser, trans]);
  if (getUser && getUser.isactive) {
    bcrypt.hash(newPassword, 10, async (err, hash) => {
      if (err) throw new Error(err);
      else {
        const ftpass = getUser.update({ isactive: false }, { transaction });
        const usr = user.update(
          { password: hash },
          {
            where: { email: getUser.userEmail },
          },
          { transaction }
        );
        const [passwordUpdated, userUpdated] = await Promise.all([ftpass, usr]);
        if (passwordUpdated && userUpdated) {
          transaction.commit();
          return res.send("password updated successfully");
        }
        transaction.rollback();
        return res.send("something failed , please try again after some time");
      }
    });
  } else {
    return res.status(401).send("Link expired or invalid");
  }
};
