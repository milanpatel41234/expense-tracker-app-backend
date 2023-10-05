const { user, expense } = require("../database/db");

const deleteexpense = async (req, res) => {
  try {
    const id = req.params.id;
    const oneExpense = expense.findByPk(id);
    const oneUser = user.findByPk(req.user);
    const [foundExpense, foundUser] = await Promise.all([oneExpense, oneUser]);
    const updateUser = await foundUser.update({
      total: foundUser.total - foundExpense.amount,
    });
    const deleteExpense = foundExpense.destroy();
    const [updatedUser, deletedExpense] = await Promise.all([
      updateUser,
      deleteExpense,
    ]);
    if (updatedUser.error || deletedExpense.error) {
      throw new Error();
    } else {
      return res.send({ success: true, message: "Successfully deleted"});
    }
  } catch (error) {
    return res.send({ success: true, message: "Unable to deleted", error });
  }
};
module.exports = deleteexpense;
