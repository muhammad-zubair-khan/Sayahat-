const express = require("express");
const router = express.Router();
const {registerAdmin,login,logout} = require("../Controllers/admin");

router.post("/admin/register", registerAdmin);
router.post('/admin/login',login);
router.post('/admin/logout',logout);

module.exports = router;
