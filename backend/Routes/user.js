const express = require("express");
const router = express.Router();
const {registerUser,login,logout,userProfile,getAllUsers} = require("../Controllers/user");
const userAuthMiddleware = require('../Middleware/userAuthMiddleware')

router.post("/user/register", registerUser);
router.post('/user/login',login);
router.get('/user/profile',userAuthMiddleware,userProfile)
router.post('/user/logout',logout);
// router.get("/allUsers", getAllUsers);

module.exports = router;
