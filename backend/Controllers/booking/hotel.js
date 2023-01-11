const Hotel = require("../../Models/booking/hotel");
const catchAsyncErrors = require("../../utils/catchAsyncErrors");
const ErrorHandler = require("../../utils/errorhandler");

// Book Hotel
exports.newBookHotel = catchAsyncErrors(async (req, res, next) => {
  const { name,price,hotelContactInfo, hotelActivityInfo,city,
    view,
    fullyRefundable,
    rooms, paymentInfo } = req.body;

  const bookedHotel = await Hotel.create({
    name,
    price,
    hotelContactInfo,
    hotelActivityInfo,
    city,
    fullyRefundable,
    rooms,
    paymentInfo,
    view,
    paidAt: Date.now(),
    user: req.user._id,
  });

  res.status(201).json({
    success: true,
    bookedHotel,
  });
});


// get logged in user Hotels
exports.myHotels = catchAsyncErrors(async (req, res, next) => {
  const hotels = await Hotel.find({ user: req.user._id });

  res.status(200).json({
    success: true,
    hotels,
  });
});


// get Hotel Detail
exports.getHotelDetail = catchAsyncErrors(async (req, res, next) => {
  const hotel = await Hotel.findById(req.params.id).populate(
    "user",
    "name email"
  );

  if (!hotel) {
    return next(new ErrorHandler("Hotel not found with this Id", 404));
  }

  res.status(200).json({
    success: true,
    hotel,
  });
});


exports.updateBookedHotelDetails = catchAsyncErrors(async (req, res, next) => {
  const updatedData = await Hotel.findByIdAndUpdate(
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


// get all Boooked Hotels -- Admin
exports.getAllBookedHotels = catchAsyncErrors(async (req, res, next) => {
  const bookedHotels = await Hotel.find();

  let totalAmount = 0;

  bookedHotels.forEach((hotel) => {
    totalAmount += hotel.price;
  });

  res.status(200).json({
    success: true,
    totalAmount,
    bookedHotels,
  });
});

exports.getBookedHotelDetail = catchAsyncErrors(async (req, res, next) => {
  const hoteldetails = await Hotel.findById(req.params.id)

  if (!hoteldetails) {
    return next(new ErrorHandler("Hotel not found with this Id", 404));
  }

  res.status(200).json({
    success: true,
    hoteldetails,
  });
});