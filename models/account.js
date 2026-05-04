const mongoose = require("mongoose");

const accountSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      unique: true,
    },

    accountNumber: {
      type: String,
      unique: true,
    },

    balance: {
      type: Number,
      default: 15000,
    },
  },
  { timestamps: true }
);

// ✅ FIX: prevent OverwriteModelError
module.exports =
  mongoose.models.Account || mongoose.model("Account", accountSchema);