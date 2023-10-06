const { expense, sequelize } = require("../database/db");

const postexpense = async (req, res) => {
  try {
    const data = {
      amount: +req.body.amount,
      date: req.body.date,
      category: req.body.category,
      details: req.body.details,
      userEmail: req.user.email,
    };
    const transaction = await sequelize.transaction();
    const createExpense = await expense.create(data, { transaction });
    const updateUser = await req.user.update(
      {
        total: Number(req.user.total) + Number(data.amount),
      },
      { transaction }
    );
    if (createExpense.error || updateUser.error) {
      transaction.rollback();
      throw new Error();
    } else {
      transaction.commit();
      return res.send(createExpense);
    }
  } catch (error) {
    res.send(error);
  }
};
module.exports = postexpense;
