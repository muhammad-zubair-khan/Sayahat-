const express = require("express");
const router = express.Router();
const {
  requireSignin,
  adminMiddleware,
  userMiddleware,
} = require("../../common-middleware");
const {
  saveCarContactDetail,
} = require("../../Controllers/checkout/carContact");

//For user
router.post(
  "/checkout/carContactdetails",
  requireSignin,
  userMiddleware,
  saveCarContactDetail
);

module.exports = router;