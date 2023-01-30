const User = require("../Models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const shortid = require("shortid");
const catchAsyncErrors = require("../utils/catchAsyncErrors");
const nodemailer = require("nodemailer");
const keySecret = process.env.JWT_SECRET;

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD,
  },
});

const generateJwtToken = (_id, role) => {
  return jwt.sign({ _id, role }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });
};

exports.signup = (req, res) => {
  User.findOne({ email: req.body.email }).exec(async (error, user) => {
    if (user)
      return res.status(400).json({
        msg: "User already registered",
      });

    const { firstName, lastName, email, password, createdAt } = req.body;
    if(!firstName, !lastName || !email, !password){
      return res.status(400).json({msg:"please enter all fields"})
    }
    const hash_password = await bcrypt.hash(password, 10);
    const _user = new User({
      firstName,
      lastName,
      email,
      hash_password,
      userName: shortid.generate(),
      createdAt,
    });

    _user.save((error, user) => {
      if (error) {
        throw error
      }
      if (user) {
        const token = generateJwtToken(user._id, user.role);
        const { _id, firstName, lastName, email, role, fullName, createdAt } = user;
        return res.status(201).json({
          token,
          user: { _id, firstName, lastName, email, role, fullName, createdAt },
        });
      }
    });
  });
};

exports.signin = async(req, res) => {
  User.findOne({ email: req.body.email }).exec(async (error, user) => {
    if (error) return res.status(400).json({ error });

    if (user) {
      const isPassword = await user.authenticate(req.body.password);
      if (isPassword && user.role === "user") {
        const token = generateJwtToken(user._id, user.role);
        const { _id, firstName, lastName, email, role, fullName, createdAt } =
          user;
        // res.cookie("token", token, { expiresIn: "1d" });
        res.status(200).json({
          token,
          user: { _id, firstName, lastName, email, role, fullName, createdAt },
        });
      } else {
        return res.status(400).json({
          message: "Invalid credentials",
        });
      }
    } else {
      return res.status(400).json({ message: "Invalid credentials" });
    }
  });
};

exports.sendPasswordLink = async (req, res) => {
  const { email } = req.body;
  // if (!email) {
  //   res.status(401).json({
  //     message: "Enter your Email",
  //   });
  // }
  try {
    const userFind = await User.findOne({ email: email })
      if(!userFind){
        return res.status(400).json({
          message: 'User not found'
        })
      }
    //generate token
    const token = jwt.sign({ _id: userFind._id }, keySecret, {
      expiresIn: "1d",
    });

    // console.log("token",token)

    const userToken = await User.findByIdAndUpdate(
      { _id: userFind._id },
      { verifyToken: token },
      { new: true }
    );
    // console.log("userToken",userToken)

    if (userToken) {
      const mailOptions = {
        from: "mzk112000@gmail.com",
        to: email,
        subject: "Sending Email For password Reset",
        text: `This Link Valid For 2 MINUTES http://localhost:3000/forgotpassword/${userFind.id}/${userToken.verifyToken}`,
      };

      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.log("error", error);
          res.status(401).json({ status: 401, message: "email not send" });
        } else {
          console.log("Email sent", info.response);
          res
            .status(201)
            .json({ status: 201, message: "Email sent Succsfully" });
        }
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Something went wrong. Please try again later"
    });
  }
};
exports.forgotPassword = async (req, res) => {
  const { id, token } = req.params;

  try {
    const validuser = await User.findOne({ _id: id, verifyToken: token });

    const verifyToken = jwt.verify(token, keySecret);

    // console.log(verifyToken);

    if (validuser && verifyToken._id) {
      res.status(201).json({ status: 201, validuser });
    } else {
      res.status(401).json({ status: 401, message: "user not exist" });
    }
  } catch (error) {
    res.status(401).json({ status: 401, error });
  }
};

exports.saveNewPass = async (req, res) => {
  const { id, token } = req.params;

  const { password } = req.body;

  try {
    const validuser = await User.findOne({ _id: id, verifyToken: token });
    // console.log("validuser", validuser);
    const verifyToken = jwt.verify(token, keySecret);
    // console.log("verifyToken", verifyToken);

    if (validuser && verifyToken._id) {
      const newpassword = await bcrypt.hash(password, 12);
      // console.log("newpassword", newpassword);
      const setnewuserpass = await User.findByIdAndUpdate(
        { _id: id },
        { hash_password: newpassword }
      );
      // console.log("setnewuserpass", setnewuserpass);

      setnewuserpass.save();
      res.status(201).json({ status: 201, setnewuserpass });
    } else {
      res.status(401).json({ status: 401, message: "user not exist" });
    }
  } catch (error) {
    res.status(401).json({ status: 401, error });
  }
};
// update User Profile
// exports.updateProfile = catchAsyncErrors(async (req, res, next) => {
//   const newUserData = {
//     name: req.body.name,
//     email: req.body.email,
//   };

//   const user = await User.findByIdAndUpdate(req.user.id, newUserData, {
//     new: true,
//     runValidators: true,
//     useFindAndModify: false,
//   });

//   res.status(200).json({
//     success: true,
//   });
// });

// exports.updateProfile = (req, res, next) => {
//     const user =  User.findById(req.user)
//     console.log(user)
// };
