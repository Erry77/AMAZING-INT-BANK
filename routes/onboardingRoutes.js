const router = require("express").Router();
const protect = require("../middleware/authMiddleware");
const { verifyIdentity } = require("../controller/onboardingController");
const express = require("express");
// const router = express.Router();

const onboardingController = require("../controller/onboardingController");

// Example route
router.post("/create", onboardingController.createAccount);

module.exports = router;

router.post("/verify", protect, verifyIdentity);

module.exports = router;