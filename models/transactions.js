const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema({
  reference: String,

  sender: { type: mongoose.Schema.Types.ObjectId, ref: "Account" },
  receiverAccountNumber: String,

  type: {
    type: String,
    enum: ["intra", "inter"]
  },

  amount: Number,

  status: {
    type: String,
    enum: ["pending", "success", "failed"],
    default: "pending"
  }

}, { timestamps: true });

module.exports = mongoose.model("Transaction", transactionSchema);