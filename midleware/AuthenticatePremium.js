const jwt = require("jsonwebtoken");
const Users = require("../database/users");

module.exports = async (req, res, next) => {
  try {
    const token = req.header("token");
    if (!token)
      return res.json({
        message: "user is not authorized",
        isPremiumUser: false,
      });
    const { userEmail } = jwt.verify(token, process.env.JWT_KEY);
    const user = await Users.findOne({ email: userEmail });
    if (user.ispremium) {
      req.user = user;
      next();
    } else {
      return res.json({
        message: "user is not authorized",
        isPremiumUser: false,
      });
    }
  } catch (error) {
    res.status(405).send({ success: false, isPremiumUser: false });
  }
};
