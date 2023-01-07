const express = require("express");
const router = express.Router();
const {
  requireSignin,
  adminMiddleware,
  userMiddleware,
} = require("../../common-middleware");
const { saveCarContactDetail } = require("../../Controllers/checkout/carContact");

//For user
router.post(
  "/checkout/carContactdetails",
  requireSignin,
  userMiddleware,
  saveCarContactDetail
);
//For Admin
// router.get("/getContactDetail/:id", requireSignin,
// userMiddleware,getContactDetail);

module.exports = router;
