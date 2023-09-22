import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
    trim: true,
  },
  roles: [
    {
      type: String,
      enum: ["Company", "User", "Admin"],
      default: "User",
    },
  ],
});

module.exports = mongoose.model("User", userSchema);
