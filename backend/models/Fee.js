const mongoose = require("mongoose");

const feeSchema = new mongoose.Schema({
  regNo: { type: String, required: true }, // link with user
  semester: String,
  amount: String,
  status: String, // Paid / Pending
  dueDate: String,
  paidDate: String,
  fine: String,
});

module.exports = mongoose.model("Fee", feeSchema);