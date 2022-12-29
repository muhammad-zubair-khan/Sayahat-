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

const express = require('express');
const { signup, signin } = require('../Controllers/auth');
const { validateSignupRequest, isRequestValidated, validateSigninRequest } = require('../validators/auth');
const router = express.Router();
// const { requireSignin } = require('../common-middleware');

router.post('/signup',validateSignupRequest, isRequestValidated, signup);
router.post('/signin',validateSigninRequest, isRequestValidated, signin);


// router.post('/profile', requireSignin, (req, res) => {
//     res.status(200).json({ user: 'profile' })
// });

module.exports = router;