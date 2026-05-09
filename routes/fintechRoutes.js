const express = require("express");
const router = express.Router();
const apiAdapter = require("../services/apiAdapter"); // make sure this file exists
router.post("/onboard", (req, res) => {
  res.json({
    message: "Fintech onboard route working",
    data: req.body
  });
});

module.exports = router;


// POST /api/fintech/onboard
router.post("/onboard", async (req, res) => {
  try {
    const response = await apiAdapter.onboardFintech(req.body);
    res.json(response);
  } catch (err) {
    res.status(400).json(err.message || err);
  }
});

module.exports = router;