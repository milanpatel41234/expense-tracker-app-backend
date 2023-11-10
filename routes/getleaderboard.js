const Users = require("../database/users");

const getleaderboard = async (req, res) => {
  try {
    const leaderboard = await Users.find()
      .sort({ total: -1 })
      .select({ name: 1, total: 1, _id: 1 });
    return res.json(leaderboard);
  } catch (error) {
    return res.status(500).send(error);
  }
};
module.exports = getleaderboard;
