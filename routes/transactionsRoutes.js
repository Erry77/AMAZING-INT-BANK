const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");
const { verifyIdentity } = require("../controller/onboardingController");
const { transfer } = require("../controller/transactionController");


// Verify identity (BVN/NIN etc)
router.post("/verify", protect, verifyIdentity);


// Transfer money
router.post("/transfer", protect, transfer);

module.exports = router;