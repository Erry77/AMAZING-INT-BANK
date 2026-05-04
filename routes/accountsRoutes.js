const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");

const {
  createAccount,
  getMyAccount,
  getAccountBalance
} = require("../controller/accountController");


// 🔹 Create Account (ONLY after onboarding)
router.post("/create", protect, createAccount);


// 🔹 Get logged-in user's account details
router.get("/me", protect, getMyAccount);


// 🔹 Check account balance
router.get("/balance", protect, getAccountBalance);


module.exports = router;