const mongoose = require("mongoose");
const Account = require("../models/Account");
const Transaction = require("../models/Transactions");

// NAME ENQUIRY
exports.nameEnquiry = async (req, res) => {
  try {
    const { accountNumber } = req.params;

    const account = await Account.findOne({ accountNumber }).populate(
      "user",
      "fullName"
    );

    if (!account) {
      return res.status(404).json({ msg: "Account not found" });
    }

    res.json({
      accountNumber,
      name: account.user.fullName,
    });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

// TRANSFER
exports.transfer = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const { accountNumber, amount } = req.body;

    const sender = await Account.findOne({ user: req.user.id }).session(session);
    const receiver = await Account.findOne({ accountNumber }).session(session);

    if (!receiver) {
      throw new Error("Receiver not found");
    }

    if (sender.balance < amount) {
      throw new Error("Insufficient balance");
    }

    sender.balance -= amount;
    receiver.balance += amount;

    await sender.save({ session });
    await receiver.save({ session });

    const tx = await Transaction.create(
      [
        {
          reference: Date.now().toString(),
          sender: sender._id,
          receiverAccountNumber: accountNumber,
          type: "intra",
          amount,
          status: "success",
        },
      ],
      { session }
    );

    await session.commitTransaction();

    res.json({ msg: "Transfer successful", tx });
  } catch (err) {
    await session.abortTransaction();
    res.status(400).json({ msg: err.message });
  } finally {
    session.endSession();
  }
};