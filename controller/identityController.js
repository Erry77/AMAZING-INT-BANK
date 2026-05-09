const axios = require("axios");

// INSERT BVN
const insertBvn = async (req, res) => {
  try {
    const response = await axios.post(
      "https://nibssbyphoenix.onrender.com/api/insertBvn",
      req.body
    );

    res.status(201).json(response.data);

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

// INSERT NIN
const insertNin = async (req, res) => {
  try {
    const response = await axios.post(
      "https://nibssbyphoenix.onrender.com/api/insertNin",
      req.body
    );

    res.status(201).json(response.data);

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

// VALIDATE BVN
const validateBvn = async (req, res) => {
  try {
    const response = await axios.post(
      "https://nibssbyphoenix.onrender.com/api/validateBvn",
      req.body
    );

    res.status(200).json(response.data);

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

// VALIDATE NIN
const validateNin = async (req, res) => {
  try {
    const response = await axios.post(
      "https://nibssbyphoenix.onrender.com/api/validateNin",
      req.body
    );

    res.status(200).json(response.data);

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

module.exports = {
  insertBvn,
  insertNin,
  validateBvn,
  validateNin,
};