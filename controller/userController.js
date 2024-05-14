const User = require("../models/userModel");
const bcrypt = require("bcrypt");
require("dotenv").config;

const UserController = {
  getAllUsers,
  getUserById,
  createUser,
};

async function getAllUsers(req, res) {
  try {
    const users = await User.find().select("-password");
    res.status(200).json({
      status: {
        code: 200,
        message: "Succes",
      },
      data: users,
    });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
}

async function getUserById(req, res) {
  const user = await User.findById(req.params.id).select("-password");
  try {
    res.status(200).json({
      status: {
        code: 200,
        message: "Succes",
      },
      data: user,
    });
  } catch (error) {
    res.status(500).json({ messag: "Server Error" });
  }
}

async function createUser(req, res) {
  try {
    const { username, password, email } = req.body;
    const existingUser = await User.findOne({ username });
    const existingEmail = await User.findOne({ email });
    if (existingUser || existingEmail) {
      return res.status(400).json({
        status: {
          code: 400,
          message: "Username or Email already exist",
        },
      });
    }

    const hashedPassword = await bcrypt.hash(password, 11);
    const newUser = new User({
      username,
      password: hashedPassword,
      email,
    });

    const user = await newUser.save();
    res.status(200).json({
      status: {
        code: 200,
        message: "Success",
      },
      data: user,
    });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
}

module.exports = UserController;
