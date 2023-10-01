const expense = require("../database/db").expense;

const postexpense = (req, res) => {
  const data = {
    ...req.body,
    userEmail:req.user,
  }
  expense
    .create(data)
    .then((response) => {
      res.send(response);
    })
    .catch((err) => {
      console.log(err);
      res.send(err);
    });
};
module.exports = postexpense