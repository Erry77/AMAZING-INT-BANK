const Onboarding = require("../models/Onboarding");
const { verifyBVN, verifyNIN } = require("../utilities/bvnServices");

exports.createAccount = (req, res) => {
  res.status(201).json({
    message: "Account created successfully"
  });
};

exports.verifyIdentity = async (req, res) => {
  const { bvn, nin } = req.body;

  let result;

  if (bvn) {
    result = await verifyBVN(bvn);
    if (!result.status) return res.status(400).json({ msg: "Invalid BVN" });

    await Onboarding.create({
      user: req.user.id,
      bvn,
      verified: true,
      verificationType: "bvn"
    });

  } else if (nin) {
    result = await verifyNIN(nin);
    if (!result.status) return res.status(400).json({ msg: "Invalid NIN" });

    await Onboarding.create({
      user: req.user.id,
      nin,
      verified: true,
      verificationType: "nin"
    });

  } else {
    return res.status(400).json({ msg: "Provide BVN or NIN" });
  }

  res.json({ msg: "Verification successful" });
};