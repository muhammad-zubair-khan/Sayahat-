const Hotel = require("../../Models/booking/hotel");
const catchAsyncErrors = require("../../utils/catchAsyncErrors");
const ErrorHandler = require("../../utils/errorhandler");

// Book Hotel
exports.newBookHotel = catchAsyncErrors(async (req, res, next) => {
  const { name,price,hotelContactInfo, hotelActivityInfo,city,
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
