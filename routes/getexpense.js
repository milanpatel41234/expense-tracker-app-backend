const { expense } = require("../database/db");

const getexpense = async (req, res) => {
  const currentpage = req.query.page > 1 ? Number(req.query.page) : 1;
  const limit = req.query.pagelimit > 5 ? Number(req.query.pagelimit) : 5;
  try {
    const fetchTotal_no = expense.count({
      where: { userEmail: req.user.email },
    });
    const fetchExpense = expense.findAll({
      where: { userEmail: req.user.email },
      offset: (currentpage - 1) * limit,
      limit: limit,
      order: [["updatedat", "DESC"]],
    });
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
