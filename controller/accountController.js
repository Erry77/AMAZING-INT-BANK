const Account = require("../models/account");
const Onboarding = require("../models/Onboarding");


// 🔢 Generate Account Number (with retry safety)
const generateAccountNumber = async () => {
  let accountNumber;
  let exists = true;

  while (exists) {
    accountNumber = "10" + Math.floor(10000000 + Math.random() * 90000000);
    exists = await Account.findOne({ accountNumber });
  }

  return accountNumber;
};



// 🟢 CREATE ACCOUNT (After onboarding only)
exports.createAccount = async (req, res) => {
  try {
    // ✅ Check onboarding verification
    const onboarding = await Onboarding.findOne({
      user: req.user.id,
      verified: true
    });

    if (!onboarding) {
      return res.status(400).json({
        success: false,
        message: "Complete BVN/NIN verification first"
      });
    }

    // ✅ Ensure only one account per user
    const existingAccount = await Account.findOne({
      user: req.user.id
    });

    if (existingAccount) {
      return res.status(400).json({
        success: false,
        message: "User already has an account"
      });
    }

    // 🏦 Create account (₦15,000 prefunded from model)
    const account = await Account.create({
      user: req.user.id,
      accountNumber: await generateAccountNumber()
    });

    res.status(201).json({
      success: true,
      message: "Account created successfully",
      data: account
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};



// 🔵 GET MY ACCOUNT DETAILS
exports.getMyAccount = async (req, res) => {
  try {
    const account = await Account.findOne({
      user: req.user.id
    }).populate("user", "fullName email");

    if (!account) {
      return res.status(404).json({
        success: false,
        message: "Account not found"
      });
    }

    res.status(200).json({
      success: true,
      data: account
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};



// 💰 GET ACCOUNT BALANCE
exports.getAccountBalance = async (req, res) => {
  try {
    const account = await Account.findOne({
      user: req.user.id
    });

    if (!account) {
      return res.status(404).json({
        success: false,
        message: "Account not found"
      });
    }

    res.status(200).json({
      success: true,
      balance: account.balance
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};



// 🔍 NAME ENQUIRY (Recipient verification before transfer)
exports.nameEnquiry = async (req, res) => {
  try {
    const { accountNumber } = req.params;

    const account = await Account.findOne({ accountNumber })
      .populate("user", "fullName");

    if (!account) {
      return res.status(404).json({
        success: false,
        message: "Account not found"
      });
    }

    res.status(200).json({
      success: true,
      data: {
        accountNumber: account.accountNumber,
        accountName: account.user.fullName
      }
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};