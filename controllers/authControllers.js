const { response } = require("express");
const userModel = require("../models/userModel");
const bcrypt = require("bcryptjs");
const JWT = require("jsonwebtoken");

const registerController = async (req, res) => {
  try {
    //destructing req
    const { userName, email, password, phone, address } = req.body;

    if (!userName || !email || !password || !address || !phone) {
      return res.status(500).send({
        success: false,
        message: "Please provide all fields",
      });
    }

    // check user
    const existing = await userModel.findOne({ email });
    if (existing) {
      return res.status(500).send({
        success: false,
        message: "Youe email is already registered kindly Login",
      });
    }

    // hashing password
    const salt = bcrypt.genSaltSync(10);
    const hashPassword = await bcrypt.hash(password, salt);

    //create new user
    const user = await userModel.create({
      userName,
      email,
      password: hashPassword,
      phone,
      address,
    });
    res.status(201).send({
      success: true,
      message: "Successfully Registered",
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in register API",
      error: error.message,
    });
  }
};

const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    //Valid Function
    if (!email || !password) {
      return res.status(400).send({
        success: false,
        message: "Please provide EMAIL or PASSWORD",
      });
    }

    //CheckUser
    const user = await userModel.findOne({ email });

    if (!user) {
      return res.status(500).send({
        success: false,
        message: "User Not Found",
      });
    }

    // Check User password | Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(500).send({
        success: false,
        message: "Invalid Credentials",
      });
    }

    // Creating token
    const token = JWT.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    // Hiding Password
    user.password = undefined;

    res.status(200).send({
      success: true,
      message: "Login Successfully!",
      token,
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Login API",
      error: error.message,
    });
  }
};

module.exports = { registerController, loginController };
