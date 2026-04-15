const { response } = require("express");
const userModel = require("../models/userModel");

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

    //create new user
    const user = await userModel.create({
      userName,
      email,
      password,
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
    const user = await userModel.findOne({ email: email, password: password });

    if (!user) {
      return res.status(404).send({
        success: false,
        message: "User Not Found or Password Mismatch",
      });
    }

    res.status(200).send({
      success: true,
      message: "Login Successfully!",
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
