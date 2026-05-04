const mongoose = require("mongoose");

const onboardingSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },

  bvn: { type: String },
  nin: { type: String },

  verified: { type: Boolean, default: false },

  verificationType: {
    type: String,
    enum: ["bvn", "nin"]
  }

}, { timestamps: true });

module.exports = mongoose.model("Onboarding", onboardingSchema);