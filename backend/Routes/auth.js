// const express = require("express");
// const router = express.Router();
// const {registerAdmin,login,logout,adminProfile,getAllAdmins} = require("../Controllers/admin");
// const AuthMiddleware = require('../Middleware/AuthMiddleware')
// // router.post("/admin/register", registerAdmin);
// // router.post("/admin/login", login);
// // router.post("/admin/logout", logout);
// router.post("/admin/register", registerAdmin);
// router.get("/allAdmins", getAllAdmins);
// router.post('/admin/login',login);
// router.get('/admins/profile',AuthMiddleware,adminProfile)
// router.post('/admin/logout',logout);

// module.exports = router;

const express = require("express");
const {
  signup,
  signin,
  updateProfile,
  getUserDetails,
  forgotPassword,
} = require("../Controllers/auth");
const {
  validateSignupRequest,
  isRequestValidated,
  validateSigninRequest,
} = require("../validators/auth");
const router = express.Router();
// const { requireSignin } = require('../common-middleware');
const nodemailer = require("nodemailer");
const user = require("../Models/user");
const jwt = require("jsonwebtoken");
const keySecret = process.env.JWT_SECRET;
const bcrypt = require("bcrypt")
// email config

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD,
    // user:"mzk112000@gmail.com",
    // pass:"razvdwxvxdfzoijh"
  },
});

router.post("/signup", validateSignupRequest, isRequestValidated, signup);
router.post("/signin", validateSigninRequest, isRequestValidated, signin);

router.post("/sendpasswordlink", async (req, res) => {
  console.log(req.body);

  const { email } = req.body;

  if (!email) {
    res.status(401).json({
      status: 401,
      message: "Enter your Email",
    });
  }

  try {
    const userFind = await user.findOne({ email: email });
    // console.log("userFind",userFind)

    //generate token
    const token = jwt.sign({ _id: userFind._id }, keySecret, {
      expiresIn: "1d",
    });

    // console.log("token",token)

    const userToken = await user.findByIdAndUpdate(
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
  } catch (error) {}
});

// verify user for forgot password time
router.get("/forgotpassword/:id/:token", async (req, res) => {
  const { id, token } = req.params;

  try {
    const validuser = await user.findOne({ _id: id, verifyToken: token });

    const verifyToken = jwt.verify(token, keySecret);

    console.log(verifyToken);

    if (validuser && verifyToken._id) {
      res.status(201).json({ status: 201, validuser });
    } else {
      res.status(401).json({ status: 401, message: "user not exist" });
    }
  } catch (error) {
    res.status(401).json({ status: 401, error });
  }
});

router.post("/:id/:token", async (req, res) => {
  const { id, token } = req.params;

  const { password } = req.body;

  try {
    const validuser = await user.findOne({ _id: id, verifyToken: token });
    // console.log("validuser", validuser);
    const verifyToken = jwt.verify(token, keySecret);
    // console.log("verifyToken", verifyToken);

    if (validuser && verifyToken._id) {
      const newpassword = await bcrypt.hash(password, 12);
      console.log("newpassword", newpassword);
      const setnewuserpass = await user.findByIdAndUpdate(
        { _id: id },
        { hash_password: newpassword }
      );
      console.log("setnewuserpass", setnewuserpass);

      setnewuserpass.save();
      res.status(201).json({ status: 201, setnewuserpass });
    } else {
      res.status(401).json({ status: 401, message: "user not exist" });
    }
  } catch (error) {
    res.status(401).json({ status: 401, error });
  }
});

// router.route("/me").get(isRequestValidated, getUserDetails);
// router.route("/me/update").put(isRequestValidated, updateProfile);

// router.post('/profile', requireSignin, (req, res) => {
//     res.status(200).json({ user: 'profile' })
// });

module.exports = router;
