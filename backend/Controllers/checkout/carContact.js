const ContactInfoModel = require("../../Models/checkout/carContactInfo");
const path = require("path");
const ErrorHandler = require("../../utils/errorhandler");
const catchAsyncErrors = require("../../utils/catchAsyncErrors");

// Save Hotel Contact Info
exports.saveCarContactDetail = catchAsyncErrors(async (req, res, next) => {
  const { firstName, lastName, email, phone, nic } = req.body;

  const carContactInfo = await new ContactInfoModel({
    firstName,
    lastName,
    email,
    phone,
    nic,
    createdBy: req.user._id,
  });

  carContactInfo.save((err, data) => {
    if (err) {
      return res.status(400).json({
        err,
      });
    }
    if (data) {
      return res.status(201).json({
        carContactInfo,
      });
    }
  });
});
