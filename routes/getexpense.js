const expense = require("../database/db").expense;

const getexpense = (req, res) => {
  expense
    .findAll({
      where:{userEmail:req.user}
    })
    .then((response) => {
      res.json(response);
    })
    .catch((err) => {
      console.log('errrrr',err);
      res.send(err);
    });
};
module.exports = getexpense