const { sequelize, expense } = require("../database/db");

const deleteexpense = async (req, res) => {
  try {
    const id = req.params.id;
    const trans = await sequelize.transaction();
    const oneExpense = await expense.findByPk(id);
    const [transaction ,foundExpense] = await Promise.all([trans , oneExpense]);
    const updateUser =  req.user.update({
      total: req.user.total - foundExpense.amount,
    },{transaction});
    const deleteExpense = foundExpense.destroy({transaction});
    const [updatedUser, deletedExpense] = await Promise.all([
      updateUser,
      deleteExpense,
    ]);
    if (updatedUser.error || deletedExpense.error) {
      transaction.rollback();
      throw new Error();
    } else {
      transaction.commit();
      return res.send({ success: true, message: "Successfully deleted"});
    }
  } catch (error) {
    return res.send({ success: true, message: "Unable to deleted", error });
  }
};
module.exports = deleteexpense;
