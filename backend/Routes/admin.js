const express = require("express");
const router = express.Router();
const {registerAdmin,login,logout,adminProfile,getAllAdmins} = require("../Controllers/admin");
const AuthMiddleware = require('../Middleware/AuthMiddleware')
// router.post("/admin/register", registerAdmin);
// router.post("/admin/login", login);
// router.post("/admin/logout", logout);
router.post("/admin/register", registerAdmin);
router.get("/allAdmins", getAllAdmins);
router.post('/admin/login',login);
router.get('/admins/profile',AuthMiddleware,adminProfile)
router.post('/admin/logout',logout);

module.exports = router;
