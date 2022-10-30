const express = require("express");
const router = express.Router();
const {registerAdmin,login,logout,userProfile,getAllUsers} = require("../Controllers/admin");
const AuthMiddleware = require('../Middleware/AuthMiddleware')
// router.post("/admin/register", registerAdmin);
// router.post("/admin/login", login);
// router.post("/admin/logout", logout);
router.post("/user/register", registerAdmin);
router.get("/allUsers", getAllUsers);
router.post('/user/login',login);
router.get('/users/profile',AuthMiddleware,userProfile)
router.post('/user/logout',logout);

module.exports = router;
