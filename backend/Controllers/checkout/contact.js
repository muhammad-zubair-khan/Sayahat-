// createVacationProduct
const Contact = require("../../Models/checkout/contact");
const path = require("path");
const ErrorHandler = require("../../utils/errorhandler");
const catchAsyncErrors = require("../../utils/catchAsyncErrors");

// Create Hotel -- Admin
exports.saveContactDetail = catchAsyncErrors(async (req, res, next) => {
  const { firstName, lastName, email, phone } = req.body;

  const contact = await new Contact({
    firstName,
    lastName,
    email,
    phone,
    createdBy: req.user._id,
  });

  contact.save((err, data) => {
    if (err) {
      return res.status(400).json({
        err,
      });
    }
    if (data) {
      return res.status(201).json({
        contact,
      });
    }
  });
});
