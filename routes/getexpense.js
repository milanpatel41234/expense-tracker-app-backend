const {expense } = require("../database/db");

const getexpense = async(req, res) => {
  try {
    const getExpense = await expense.findAll({
      where:{userEmail:req.user.email}
    })
    response = {expense:getExpense,
    total:req.user.total}
    if(getExpense){
     return res.json(response);
    }else throw new Error(getExpense.error)
    
  } catch (error) {
    res.send(error);
    
  }
};
module.exports = getexpense