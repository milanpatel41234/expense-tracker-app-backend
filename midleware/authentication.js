const jwt = require("jsonwebtoken");
const Users = require("../database/users");

module.exports = async (req, res, next) => {
  try {
      const token = req.header("token");
      if (!token)
      return res.json({
    message: "user is not authorized",
});
const { userEmail } = jwt.verify(token, process.env.JWT_KEY);

const user = await Users.findOne({email:userEmail}).exec();

    req.user = user;
    next();
  } catch (error) {
    console.log('error', error)
    res.status(405).send({ success: false });
  }
};
