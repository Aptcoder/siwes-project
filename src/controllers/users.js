const User = require("../models/User");
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const OTP = require("../models/Otp");

const getAllUsers = asyncHandler(async (req, res) => {
  const users = await User.find().select("-password").lean();

  if (!users?.length)
    return res.status(400).json({
      message: "No users found",
    });

  res.json({
    message: "Users retrieved successfully",
    data: users,
  });
});

const createNewUser = asyncHandler(async (req, res) => {
  const { email, password, roles } = req.body;

  if (!email || !password || !Array.isArray(roles) || !roles.length)
    return res.status(403).json({ message: "All fields are required" });

  const duplicate = await User.findOne({ email }).lean().exec();

  if (duplicate) return res.status(409).json({ message: "Duplicate email" });

  const response = await OTP.find({ email }).sort({ createdAt: -1 }).limit(1);

  if (response.length === 0 || otp !== response[0].otp) {
    return res.status(400).json({
      success: false,
      message: "Invalid OTP",
    });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const userObject = {
    email,
    password: hashedPassword,
    roles,
  };

  const user = await User.create(userObject);

  if (user)
    return res.status(201).json({ Message: `New user ${email} created` });

  res.status(400).json({ message: "Invalid user data received" });
});

const updateUser = asyncHandler(async (req, res) => {
  const { id, email, roles, password } = req.body;

  if (!id || !email || !Array.isArray(roles) || !roles.length)
    return res.status(403).json({ message: "All fields are required" });

  const user = await User.findById(id).exec();

  if (!user) return res.status(400).json({ message: "User not found" });

  const duplicate = await User.findOne({ email }).lean().exec();

  if (duplicate && duplicate?._id.toString() !== id)
    return res.status(409).json({ message: "Duplicate email" });

  user.email = email;
  user.roles = roles;

  if (password) user.password = await bcrypt.hash(password, 10);

  const updatedUser = await user.save();

  res.json({ message: `${updatedUser.email} updated` });
});

const deleteuser = asyncHandler(async (req, res) => {
  const { id } = req.body;

  if (!id) return res.status(403).json({ message: "User Id required" });

  const user = await User.findById(id).exec();

  if (!user) return res.status(400).json({ message: "User not found" });

  const result = await user.deleteOne();

  response.json({
    message: `User ${result.email} with Id ${result._id} deleted`,
  });
});

module.exports = {
  getAllUsers,
  createNewUser,
  updateUser,
  deleteuser,
};
