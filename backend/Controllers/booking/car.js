const Car = require("../../Models/booking/car");
const catchAsyncErrors = require("../../utils/catchAsyncErrors");
const ErrorHandler = require("../../utils/errorhandler");

// Book Car
exports.newBookCar = catchAsyncErrors(async (req, res, next) => {
  const {
    name,
    price,
    CarContactInfo,
    city,
    PickupTime,
    DropoffTime,
    StartingDate,
    EndingDate,
    From,
    To,
    view,
    pickupDestination,
    paymentInfo,
  } = req.body;

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
    view,
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
  const car = await Car.findById(req.params.id).populate("user", "name email");

  if (!car) {
    return next(new ErrorHandler("Car not found with this Id", 404));
  }

  res.status(200).json({
    success: true,
    car,
  });
});

// get all Boooked Cars -- Admin
exports.getAllBookedCars = catchAsyncErrors(async (req, res, next) => {
  const bookedCars = await Car.find();

  let totalAmount = 0;

  bookedCars.forEach((car) => {
    totalAmount += car.price;
  });

  res.status(200).json({
    success: true,
    totalAmount,
    bookedCars,
  });
});

exports.updateBookedCarDetails = catchAsyncErrors(async (req, res, next) => {
  const updatedData = await Car.findByIdAndUpdate(
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

exports.getBookedCarsDetails = catchAsyncErrors(async (req, res, next) => {
  const cardetails = await Car.findById(req.params.id);

  if (!cardetails) {
    return next(new ErrorHandler("Car not found with this Id", 404));
  }

  res.status(200).json({
    success: true,
    cardetails,
  });
});
