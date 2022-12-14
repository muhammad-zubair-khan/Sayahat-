const adminModel = require("../Models/admin");
const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt');
const asyncHandler = require('express-async-handler')

exports.registerAdmin = async(req, res) => {
  adminModel.findOne({ email: req.body.email }).exec((err, admin) => {
    if (admin) {
      return res.status(400).json({
        message: "Admin Already Registered",
      });
    }
  });
  const { firstName, lastName, email, password,isAdmin } = req.body;
  const hash_password =  await bcrypt.hash(password, 10);
  const _admin = new adminModel({
    firstName,
    lastName,
    email,
    hash_password,
    isAdmin,
  });
  _admin.save((err, admin) => {
    if (err) {
      return res.status(400).json({
        success: false,
        message: err,
      });
    }
    if (admin) {
      return res.status(201).json({
        message: "Admin created successfully",
      });
    }
  });
};

exports.getAllAdmins = async(req,res) =>{
  const admins = await adminModel.find();
  res.status(200).json({
    success: true,
    admins,
  });
}

exports.login = (req, res) => {
  adminModel.findOne({ email: req.body.email }).exec(async (err, admin) => {
    if (err) {
      return res.status(400).json({ err });
    }
    if (admin) {
      const isPassword = await admin.authenticate(req.body.password);
      if (isPassword && admin.isAdmin === true) {
        const token = jwt.sign(
          { _id: admin._id, isAdmin: admin.isAdmin },
          process.env.JWT_SECRET,
          { expiresIn: "1000" }
        );
        const { _id, firstName, lastName, email, isAdmin, fullName } = admin;
        res.cookie("token", token, { expiresIn: "1000" });
        res.json({
          token,
          admin: { _id, firstName, lastName, email, isAdmin, fullName,token },
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

exports.adminProfile = asyncHandler(async (req,res)=>{
  const admin = await adminModel.findById(req.admin._id);
  if(admin){
    res.json({
      _id: admin._id,
      firstName: admin.firstName,
      lastName: admin.lastName,
      email: admin.email,
      isAdmin: admin.isAdmin,
      phone: admin.phone,
      createdAt: admin.createdAt
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