const Razorpay = require("razorpay");
const { RZP_KEY_ID, RZP_KEY_SECRATE } = require("../sec");
const Order = require("../database/db").order;

const purchasepremium = (req, res) => {
  try {
    const rzp = new Razorpay({
      key_id: RZP_KEY_ID,
      key_secret: RZP_KEY_SECRATE,
    });
    const amount = 299;
    rzp.orders.create({amount:amount, currency: "INR" }, (err, order) => {
      if (err) throw new Error(err);
      else {
        Order.create({
          orderid: order.id,
          amount: amount,
          status: "PENDING",
          userEmail: req.user,
        })
          .then(() => {
            return res.status(201).json({ order, key_id: RZP_KEY_ID });
          })
          .catch((err) => {
            throw new Error(err);
          });
      }
    });
  } catch (error) {
    console.log(error);
    res.status(203).json({ message: "Something went wrong", error: error });
  }
};
module.exports = purchasepremium;
