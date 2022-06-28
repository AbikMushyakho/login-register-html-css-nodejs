const Bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");
const UserModel = require("../models/user.model");
const Verify_Codes = require("../models/verification.model");
require("dotenv").config();
class UserController {
  register = async (req, res) => {
    const payload = req.body;
    try {
      let password = payload.password;
      const salt = Bcrypt.genSaltSync(10);
      password = Bcrypt.hashSync(password, salt);
      const data = {
        username: payload.username,
        email: payload.email,
        password: password,
        phone_no: payload.phone_no,
      };

      const find = await UserModel.findOne({ email: data.email });
      if (find) throw new Error("User Already Exists!!!");

      const code = 100000 + Math.floor(Math.random() * 900000);
      const mailSender = process.env.EMAIL;
      const mailReceiver = payload.email;

      const find_code = await Verify_Codes.findOne({
        email: mailReceiver,
      });
      if (find_code)
        throw new Error(
          "Use previous code. Have to wait for maximum 10 minutes to get new!!!"
        );
      const saved_code = await Verify_Codes.create({
        email: mailReceiver,
        code: code,
      });
      if (!saved_code) throw new Error("Code not saved!!");
      let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        auth: {
          user: mailSender,
          pass: process.env.PASSWORD,
        },
        secure: true,
      });
      // const verified = await transporter.verify();
      // if (!verified) throw new Error("Email not verified to send");
      let info = transporter.sendMail({
        from: mailSender,
        to: mailReceiver,
        subject: "Email Verification!!!",
        text: "Verify your Email!!",
        html: `Your verification code is: <b>${code}</b>`,
      });
      if (!info) throw new Error("Mail not send!!");
      const response = await UserModel.create(data);
      if (response) {
        res.status(201).json({
          status: true,
          message: "User Registerd Successfully!!! Please check you email",
        });
      } else {
        res.status(401).json({
          status: false,
          message: "User not registered",
        });
      }
    } catch (error) {
      res.status(401).json({
        status: false,
        message: error.message,
      });
    }
  };

  login = async (req, res) => {
    const payload = req.body;
    const data = {
      email: payload.email,
      password: payload.password,
    };
    try {
      const find = await UserModel.findOne({ email: data.email });
      if (!find) throw new Error("User not registered yet!!!");
      const match = Bcrypt.compareSync(data.password, find.password);
      if (match) {
        if (!find.verified)
          throw new Error("Email not verified, Please verify your email!!!");
        res.status(200).json({ status: true, message: "Login Success!!!" });
      } else {
        res
          .status(401)
          .json({ status: false, message: "Invalid Username or password!!!" });
      }
    } catch (error) {
      res.status(401).json({ status: false, message: error.message });
    }
  };
  forget_pw = async (req, res) => {
    const payload = req.body;
    console.log(payload.email);
    try {
      const checkedEmail = await UserModel.findOne({
        email: payload.email,
      });
      if (!checkedEmail) throw new Error("Email not found!!!");
      const code = 100000 + Math.floor(Math.random() * 900000);
      const mailSender = process.env.EMAIL;
      const mailReceiver = payload.email;

      const find_code = await Verify_Codes.findOne({
        email: mailReceiver,
      });
      if (find_code)
        throw new Error(
          "Use previous code. Have to wait for maximum 10 minutes to get new!!!"
        );
      const saved_code = await Verify_Codes.create({
        email: mailReceiver,
        code: code,
      });
      if (!saved_code) throw new Error("Code not saved!!");
      let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        auth: {
          user: mailSender,
          pass: process.env.PASSWORD,
        },
        secure: true,
      });
      // const verified = await transporter.verify();
      // if (!verified) throw new Error("Email not verified to send");
      let info = transporter.sendMail({
        from: mailSender,
        to: mailReceiver,
        subject: "Email Verification!!!",
        text: "Verify your Email!!",
        html: `Your verification code is: <b>${code}</b>`,
      });
      if (!info) return false;
      res.status(200).json({
        status: true,
        message: `Verification code is sent to: ${payload.email}. Please check your email!!!`,
      });
    } catch (error) {
      res.status(401).json({
        status: false,
        message: error.message,
      });
    }
  };
  verify_code = async (req, res) => {
    const payload = req.body;
    try {
      const findUser = await UserModel.findOne({ email: payload.email });
      if (!findUser) throw new Error("User doesnot exists!!");
      findUser.verified = true;
      await findUser.save();
      const find = await Verify_Codes.findOne({ email: payload.email });
      if (!find) throw new Error("Invalid email");

      const code = parseInt(payload.code);
      const saved_code = find.code;
      if (code === saved_code) {
        res.status(200).json({
          status: true,
          message: "Code Verified!!!!",
        });
      } else {
        res.status(401).json({
          status: false,
          message: "Code not verified!!!",
        });
      }
    } catch (error) {
      res.status(401).json({
        status: false,
        message: error.message,
      });
    }
  };

  change_password = async (req, res) => {
    const payload = req.body;
    try {
      const foundUser = await UserModel.findOne({
        email: payload.email,
      });
      if (!foundUser) throw new Error("User doesnot exist!!");
      const match = Bcrypt.compareSync(payload.password, foundUser.password);
      if (match)
        throw new Error("Can't use same password, please choose next one!!!");
      const salt = Bcrypt.genSaltSync(10);
      const hashPassword = Bcrypt.hashSync(payload.password, salt);
      foundUser.password = hashPassword;
      await foundUser.save();
      res.status(200).json({
        status: true,
        message: "Password changed successfully!!!",
      });
    } catch (error) {
      res.status(401).json({
        status: false,
        message: error.message,
      });
    }
  };
}
module.exports = new UserController();
