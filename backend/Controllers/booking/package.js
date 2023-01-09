const Package = require("../../Models/booking/package");
const catchAsyncErrors = require("../../utils/catchAsyncErrors");
const ErrorHandler = require("../../utils/errorhandler");

// Book Package
exports.newBookPkg = catchAsyncErrors(async (req, res, next) => {
  const { name,price,contactInfo, activityInfo,city,
    view,
    refundable, paymentInfo } = req.body;

  const bookedPkg = await Package.create({
    name,
    price,
    contactInfo,
    activityInfo,
    city,
    refundable,
    paymentInfo,
    paidAt: Date.now(),
    user: req.user._id,
    view,
  });

  res.status(201).json({
    success: true,
    bookedPkg,
  });
});


// get logged in user Packages
exports.myPackages = catchAsyncErrors(async (req, res, next) => {
  const packages = await Package.find({ user: req.user._id });

  res.status(200).json({
    success: true,
    packages,
  });
});


// get Package Detail
exports.getPackageDetail = catchAsyncErrors(async (req, res, next) => {
  const package = await Package.findById(req.params.id).populate(
    "user",
    "name email"
  );

  if (!package) {
    return next(new ErrorHandler("Package not found with this Id", 404));
  }

  res.status(200).json({
    success: true,
    package,
  });
});


// get all Boooked Packages -- Admin
exports.getAllBookedPackages = catchAsyncErrors(async (req, res, next) => {
  const bookedPackages = await Package.find();

  let totalAmount = 0;

  bookedPackages.forEach((package) => {
    totalAmount += package.price;
  });

  res.status(200).json({
    success: true,
    totalAmount,
    bookedPackages,
  });
});


exports.updateBookedPackageDetails = catchAsyncErrors(async (req, res, next) => {
  const updatedData = await Package.findByIdAndUpdate(
    req.params.id,
    { view: "read" },
    {
      new: true,
      runValidators: true,
    }
  );
  try {
    res.status(200).json({
      status: "Success",
      data: {
        updatedData,
      },
    });
  } catch (err) {
    console.log(err);
  }
});