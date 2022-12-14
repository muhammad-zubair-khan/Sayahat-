const userModel = require("../Models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt');
const asyncHandler = require('express-async-handler')

exports.registerAdmin = async(req, res) => {
  userModel.findOne({ email: req.body.email }).exec((err, user) => {
    if (user) {
      return res.status(400).json({
        message: "Admin Already Registered",
      });
    }
  });
  const { firstName, lastName, email, password,isAdmin } = req.body;
  const hash_password =  await bcrypt.hash(password, 10);
  const _user = new userModel({
    firstName,
    lastName,
    email,
    hash_password,
    isAdmin,
  });
  _user.save((err, user) => {
    if (err) {
      return res.status(400).json({
        success: false,
        message: err,
      });
    }
    if (user) {
      return res.status(201).json({
        message: "Admin created successfully",
      });
    }
  });
};

exports.getAllUsers = async(req,res) =>{
  const users = await userModel.find();
  res.status(200).json({
    success: true,
    users,
  });
}

exports.login = (req, res) => {
  userModel.findOne({ email: req.body.email }).exec(async (err, user) => {
    if (err) {
      return res.status(400).json({ err });
    }
    if (user) {
      const isPassword = await user.authenticate(req.body.password);
      if (isPassword && user.isAdmin === true) {
        const token = jwt.sign(
          { _id: user._id, isAdmin: user.isAdmin },
          process.env.JWT_SECRET,
          { expiresIn: "1000" }
        );
        const { _id, firstName, lastName, email, isAdmin, fullName } = user;
        res.cookie("token", token, { expiresIn: "1000" });
        res.json({
          token,
          user: { _id, firstName, lastName, email, isAdmin, fullName,token },
          // _id: user._id,
          // firstName: user.firstName,
          // lastName: user.lastName,
          // email: user.email,
          // isAdmin: user.isAdmin,
          // phone: user.phone,
          // token: token,
          // createdAt: user.createdAt
        });
      } else {
        return res.status(400).json({
          message: "Invalid Password",
        });
      }
    } else {
      return res.status(400).json({
        message: "Something Went Wrong",
      });
    }
  });
};

exports.userProfile = asyncHandler(async (req,res)=>{
  const user = await userModel.findById(req.user._id);
  if(user){
    res.json({
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      isAdmin: user.isAdmin,
      phone: user.phone,
      createdAt: user.createdAt
    });
  }else{
    return res.status(404).json({
      message: "Something Went Wrong",
    });
  }
})

exports.logout = (req, res) => {
  res.clearCookie("token");
  res.status(200).json({
    message: "Signout Successfully",
  });
};