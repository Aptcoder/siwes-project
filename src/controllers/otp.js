const otpGenerator = require("otp-generator");
const OTP = require("../models/Otp");
const User = require("../models/User");
const asyncHandler = require("express-async-handler");

const sendOTP = asyncHandler(async (req, res) => {
  const { email } = req.body;

  const isRegistered = await User.findOne({ email });

  if (isRegistered)
    return res.status(401).json({
      success: false,
      message: "User is already registered",
    });

  let otp = otpGenerator.generate(4, {
    upperCaseAlphabets: false,
    lowerCaseAlphabets: false,
    specialChars: false,
  });

  let result = await OTP.findOne({ otp });

  while (result) {
    otp = otpGenerator.generate(4, {
      upperCaseAlphabets: false,
    });

    result = await OTP.findOne({ otp: otp });
  }
  const otpPayload = { email, otp };

  await OTP.create(otpPayload);

  res.json({
    success: true,
    message: "OTP sent successfully",
    otp,
  });
});

module.exports = sendOTP;
