const express = require("express");
const router = express.Router();
const {
  requireSignin,
  adminMiddleware,
  userMiddleware,
} = require("../../common-middleware");
const { saveHotelContactDetail } = require("../../Controllers/checkout/hotelContact");

//For user
router.post(
  "/checkout/hotelContactdetails",
  requireSignin,
  userMiddleware,
  saveHotelContactDetail
);
//For Admin
// router.get("/getContactDetail/:id", requireSignin,
// userMiddleware,getContactDetail);

module.exports = router;
