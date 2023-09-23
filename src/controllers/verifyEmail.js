const OTP = require("../models/Otp");
const User = require("../models/User");
const asyncHandler = require("express-async-handler");

const verifyEmail = asyncHandler(async (req, res) => {
  const { email, otp } = req.body;

  const response = await OTP.find({ email }).sort({ createdAt: -1 }).limit(1);

  if (response.length === 0 || otp !== response[0].otp)
    return res.status(400).json({
      success: false,
      message: "Invalid OTP",
    });

  const user = await User.findOne({ email }).exec();

  user.isVerified = true;

  await user.save();

  return res.status(201).json({
    success: true,
    message: `New user ${user.email} verified`,
  });
});

module.exports = verifyEmail;
