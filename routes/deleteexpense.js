const expense = require("../database/db").expense;

const deleteexpense = (req, res) => {
  const id = req.params.id;
  expense
    .destroy({
      where: { id: id },
    })
    .then((response) => {
      res.send({success: true, message:"Successfully deleted"});
    })
    .catch((err) => {
      res.send({success: true, message:"Unable to deleted", error: err});
    });
};
module.exports = deleteexpense;
