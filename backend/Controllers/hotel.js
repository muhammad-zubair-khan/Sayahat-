// createVacationProduct
const Hotel = require("../models/hotel");
const category = require("../models/vacationProduct");
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
    category
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
    category
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

//get hotel by slug
exports.getHotelsBySlug = (req, res) => {
  // return next(new ErrorHander("this is my temp alert error",500))
  
  // const resultPerPage = 8;
  // const productsCount =  Product.countDocuments();
  
  const { slug } = req.params;
  category.findOne({ slug: slug })
  .select("_id")
  .exec((err, category) => {
    if (err) {
      return res.status(400).json({err});
    }
    if(!category){
      return res.status(400).json({
        success:false,
        message:"No Hotel Found"
      })
    }
    if (category) {
      Hotel.find({ category: category._id }).exec((error, hotel) => {
          if (error) {
            return res.status(400).json({
              error,
            });
          } else {
            res.status(200).json({
              success:true,
              hotel,
              // productsCount,
            });
          }
        });
      }
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