const express = require("express");
const router = express.Router();
const {
    requireSignin,
    adminMiddleware,
    userMiddleware,
  } = require("../common-middleware");
const { processPayment, sendStripeApiKey, sendBookingMail } = require("../Controllers/payment");

router.route("/payment/process").post(processPayment)
router.route("/stripeapikey").get(sendStripeApiKey)
router.route("/sendBookingMail").post(sendBookingMail)

module.exports = router;