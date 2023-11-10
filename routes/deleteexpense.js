const mongoose = require("mongoose");
const Expense = require("../database/expense");

const deleteexpense = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const id = req.params.id;
    const deleteExpense = await Expense.findByIdAndDelete(id).session(session);
    req.user.total = req.user.total - deleteExpense.amount;
    await req.user.save({ session });
    await session.commitTransaction();
    return res.send({ success: true, message: "Successfully deleted" });
  } catch (error) {
    await session.abortTransaction();
    return res.status(500).send({ success: false, message: "Unable to deleted", error });
  } finally {
    session.endSession();
  }
};
module.exports = deleteexpense;
