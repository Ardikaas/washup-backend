const { Timestamp } = require("mongodb");
const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: [true],
    },
    password: {
      type: String,
      required: [true],
    },
    email: {
      type: String,
      required: [true],
    },
    role: {
      type: String,
      required: [false],
      default: "user",
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
