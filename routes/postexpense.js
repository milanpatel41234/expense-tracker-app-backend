const { user } = require("../database/db");

const expense = require("../database/db").expense;

const postexpense = async (req, res) => {
  try {
    const data = {
      amount: +req.body.amount,
      date: req.body.date,
      category: req.body.category,
      details: req.body.details,
      userEmail: req.user,
    };
    const expRes = expense.create(data);
    const oneUser = user.findByPk(req.user);
    const [createdExpense, foundUser] = await Promise.all([expRes, oneUser]);
    const updateUser = await foundUser.update({
      total: foundUser.total + data.amount,
    });
    if (createdExpense.error || foundUser.error || updateUser.error)
      throw new Error();
    else {
      return res.send(createdExpense);
    }
  } catch (error) {
    res.send(error);
  }
};
module.exports = postexpense;
