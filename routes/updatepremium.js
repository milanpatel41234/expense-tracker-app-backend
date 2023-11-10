const Order = require("../database/order");

module.exports = async (req, res) => {
  const order_id = req.body.order_id;
  try {
    const result = await Order.updateOne(
      { orderid: order_id },
      { $set: { status: req.body.status, paymentid: req.body.payment_id } }
    );
    if (!result.acknowledged) throw new Error("Failed to update");
    if (req.body.status === "success") {
      req.user.ispremium = true;
      await req.user.save();
      return res.json({ message: "transaction successful" });
    }
    return res.json({ message: "transaction failed" });
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
};
