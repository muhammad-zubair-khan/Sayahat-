// createVacationProduct
const Hotel = require("../models/hotel");
const slugify = require('slugify');
const path = require("path");

// Create Hotel -- Admin
exports.createHotel = async(req, res, next) => {
  const {
    name,
    city,
    description,
    pool,
    Breakfast,
    Hottub,
    FullyRefundable,
    ReserveNow,
  } = req.body;

  const hotel = await new Hotel({
    name: name,
    city: city,
    slug: slugify(name),
    hotelImage: process.env.IMG_API + `/public/` + req.file.filename,
    description: description,
    pool: pool,
    Breakfast: Breakfast,
    Hottub: Hottub,
    FullyRefundable: FullyRefundable,
    ReserveNow: ReserveNow,
    // createdBy: req.user._id,
  });

  hotel.save((err, data) => {
    if (err) {
      return res.status(400).json({
        err,
      });
    }
    if (data) {
      return res.status(201).json({
        hotel,
        // file: req.files,
      });
    }
  });
};

// Get All Hotel (Admin)
exports.getAllHotels = async(req, res) => {
  const hotels = await Hotel.find();
  res.status(200).json({
    success: true,
    hotels,
  });
};


// Delete Hotel
exports.deleteHotel = async(req, res, next) => {
  const hotel = await Hotel.findById(req.params.id);
  // console.log(">>>>>",hotel)

  await hotel.remove();

  res.status(201).json({
    success: true,
    message: "Hotel Delete Successfully",
  });
};