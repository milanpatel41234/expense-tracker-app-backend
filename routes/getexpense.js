const Expense = require("../database/expense");

const getexpense = async (req, res) => {
  const currentpage = req.query.page > 1 ? Number(req.query.page) : 1;
  const limit = req.query.pagelimit > 5 ? Number(req.query.pagelimit) : 5;
  try {
    const fetchTotal_no = await Expense.countDocuments({
      userId: req.user._id,
    });

    const fetchExpense = Expense.find({ userId: req.user._id })
      .skip((currentpage - 1) * limit)
      .limit(limit)
      .sort({ _id: -1 })

    const [total_no, getExpense] = await Promise.all([
      fetchTotal_no,
      fetchExpense,
    ]);

    response = {
      expense: getExpense,
      total: req.user.total,
      currentpage: currentpage,
      next_page: total_no > currentpage * limit,
      prev_page: currentpage > 1,
    };
    if (getExpense) {
      return res.json(response);
    } else throw new Error(getExpense.error);
  } catch (error) {
    res.send(error);
  }
};
module.exports = getexpense;
