const express = require("express");
const router = express.Router();
const {
  requireSignin,
  adminMiddleware,
  userMiddleware,
} = require("../../common-middleware");
const { saveContactDetail } = require("../../Controllers/checkout/contact");

//For user
router.post(
  "/checkout/contactdetails",
  requireSignin,
  userMiddleware,
  saveContactDetail
);
//For Admin
// router.get("/getContactDetail/:id", requireSignin,
// userMiddleware,getContactDetail);

module.exports = router;
