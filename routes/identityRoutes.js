const express = require("express");

const router = express.Router();

const {
  insertBvn,
  insertNin,
  validateBvn,
  validateNin,
} = require("../controller/identityController");


// INSERT BVN
router.post("/insertBvn", insertBvn);

// INSERT NIN
router.post("/insertNin", insertNin);

// VALIDATE BVN
router.post("/validateBvn", validateBvn);

// VALIDATE NIN
router.post("/validateNin", validateNin);

module.exports = router;