const Car = require("../../Models/booking/car");
const catchAsyncErrors = require("../../utils/catchAsyncErrors");
const ErrorHandler = require("../../utils/errorhandler");

// Book Car
exports.newBookCar = catchAsyncErrors(async (req, res, next) => {
  const { name,price,CarContactInfo,city, PickupTime,
    DropoffTime,
    StartingDate,
    EndingDate,
    From,
    To,
    pickupDestination,paymentInfo } = req.body;

  const bookedCar = await Car.create({
    name,
    price,
    CarContactInfo,
    city,
    paymentInfo,
    PickupTime,
    DropoffTime,
    StartingDate,
    EndingDate,
    From,
    To,
    pickupDestination,
    paidAt: Date.now(),
    user: req.user._id,
  });

  res.status(201).json({
    success: true,
    bookedCar,
  });
});


// get logged in user Cars
exports.myCars = catchAsyncErrors(async (req, res, next) => {
  const cars = await Car.find({ user: req.user._id });

  res.status(200).json({
    success: true,
    cars,
  });
});


// get Car Detail
exports.getCarDetail = catchAsyncErrors(async (req, res, next) => {
  const car = await Car.findById(req.params.id).populate(
    "user",
    "name email"
  );

  if (!car) {
    return next(new ErrorHandler("Car not found with this Id", 404));
  }

  res.status(200).json({
    success: true,
    car,
  });
});
