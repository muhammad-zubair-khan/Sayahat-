const express = require("express");
const router = express.Router();
const {
    requireSignin,
    adminMiddleware,
    userMiddleware,
  } = require("../common-middleware");
const { processPayment, sendStripeApiKey, sendHotelBookingMail,sendCarBookingMail, sendPackageBookingMail } = require("../Controllers/payment");

router.route("/payment/process").post(processPayment)
router.route("/stripeapikey").get(sendStripeApiKey)
router.route("/sendHotelBookingMail").post(sendHotelBookingMail)
router.route("/sendCarBookingMail").post(sendCarBookingMail)
router.route("/sendPackageBookingMail").post(sendPackageBookingMail)

module.exports = router;