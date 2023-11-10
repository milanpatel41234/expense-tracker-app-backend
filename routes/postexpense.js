const Expense = require("../database/expense");

const postexpense = async (req, res) => {

  try {
    const data = {
      amount: +req.body.amount,
      date: req.body.date,
      category: req.body.category,
      details: req.body.details,
      userId: req.user._id,
    };
  
    req.user.total = Number(req.user.total) + Number(data.amount);
    const newExpense = new Expense(data);
    await req.user.save();
    const createExpense = await newExpense.save();

    return res.send(createExpense);
  } catch (error) {
    res.send(error);
  }
};
module.exports = postexpense;
