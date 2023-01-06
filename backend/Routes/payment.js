const express = require("express");
const router = express.Router();
const {
    requireSignin,
    adminMiddleware,
    userMiddleware,
  } = require("../common-middleware");
const { processPayment, sendStripeApiKey } = require("../Controllers/payment");

router.route("/payment/process").post(processPayment)
router.route("/stripeapikey").get(sendStripeApiKey)

module.exports = router;