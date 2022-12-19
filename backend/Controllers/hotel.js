// createVacationProduct
const Hotel = require("../models/hotel");
const Room = require("../Models/room");
const category = require("../models/vacationProduct");
const topDest = require("../Models/destination");
const slugify = require("slugify");
const path = require("path");
const ApiFeatures = require("../utils/apifeatures");

// Create Hotel -- Admin
exports.createHotel = async (req, res, next) => {
  const {
    name,
    city,
    description,
    pool,
    Breakfast,
    Hottub,
    FullyRefundable,
    title,
    type,
    distance,
    cheapestPrice,
    address,
    category,
  } = req.body;

  let hotelImages = [];
  if (req.files.length > 0) {
    hotelImages = req.files.map((file) => {
      return { img: file.filename };
    });
  }

  const hotel = await new Hotel({
    name: name,
    city: city,
    slug: slugify(name),
    hotelImages,
    description: description,
    pool: pool,
    Breakfast: Breakfast,
    Hottub: Hottub,
    FullyRefundable: FullyRefundable,
    distance: distance,
    cheapestPrice: cheapestPrice,
    address: address,
    title: title,
    type: type,
    category,
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
        file: req.files,
      });
    }
  });
};

// exports.getAllHotels = async(req, res) => {
//   const resultPerPage = 8;
//   const hotelsCount = await Hotel.countDocuments();

//   const apiFeature = new ApiFeatures(Hotel.find(), req.query)
//   .search()
//   .filter()

//   let hotels = await apiFeature.query;
//    let filteredHotelsCount = hotels.length;

//   // apiFeature.pagination(resultPerPage);

//   // hotels = await apiFeature.query;
//   res.status(200).json({
//     success: true,
//     hotels,
//     hotelsCount,
//     // resultPerPage,
//     filteredHotelsCount,
//   });
// };

// Get All Hotel (Admin)
exports.getAllHotels = async (req, res) => {
  // const hotels = await Hotel.find();
  const { min, max, ...others } = req.query;
  // const hotelsCount = await Hotel.countDocuments();

  try {
    const hotels = await Hotel.find({
      ...others,
      cheapestPrice: { $gt: min | 1, $lt: max || 99999 },
    });
    res.status(200).json(hotels);
  } catch (error) {
    next(error);
  }
};

exports.getAllHotelsAdmin = async(req, res) => {

  const hotels = await Hotel.find();
  res.status(200).json({
    success: true,
    hotels,
  });
};

//get hotel by slug
exports.getHotelsBySlug = async(req, res) => {
  // return next(new ErrorHander("this is my temp alert error",500))

  // const resultPerPage = 8;
  // const productsCount =  Product.countDocuments();

  const { slug } = req.params;
  category
    .findOne({ slug: slug })
    //  topDest.findOne({ slug: slug })
    .select("_id")
    .exec((err, category) => {
      if (err) {
        return res.status(400).json({ err });
      }
      if (!category) {
        return res.status(400).json({
          success: false,
          message: "No Hotel Found",
        });
      }
      if (category) {
        Hotel.find({ category: category._id }).exec((error, hotels) => {
          if (error) {
            return res.status(400).json({
              error,
            });
          }
          if (hotels.length > 0) {
            res.status(200).json({
              success: true,
              hotels,
              hotelsByPrice: {
                under5k: hotels.filter((hotel) => hotel.cheapestPrice <= 5000),
                under6k: hotels.filter(
                  (hotel) =>
                    hotel.cheapestPrice > 5000 && hotel.cheapestPrice <= 6000
                ),
                under7k: hotels.filter(
                  (hotel) =>
                    hotel.cheapestPrice > 6000 && hotel.cheapestPrice <= 7000
                ),
                under8k: hotels.filter(
                  (hotel) =>
                    hotel.cheapestPrice > 7000 && hotel.cheapestPrice <= 8000
                ),
                under9k: hotels.filter(
                  (hotel) =>
                    hotel.cheapestPrice > 8000 && hotel.cheapestPrice <= 9000
                ),
                under10k: hotels.filter(
                  (hotel) =>
                    hotel.cheapestPrice > 9000 && hotel.cheapestPrice <= 10000
                ),
              },
            });
          }
        });
      }
    });
};

//get Top Des hotel by slug
exports.getTopDesHotelsBySlug = (req, res) => {
  const { slug } = req.params;
  // category.findOne({ slug: slug })
  topDest
    .findOne({ slug: slug })
    .select("_id")
    .exec((err, category) => {
      if (err) {
        return res.status(400).json({ err });
      }
      if (!category) {
        return res.status(400).json({
          success: false,
          message: "No Hotel Found",
        });
      }
      if (category) {
        Hotel.find({ category: category._id }).exec((error, hotel) => {
          if (error) {
            return res.status(400).json({
              error,
            });
          } else {
            res.status(200).json({
              success: true,
              hotel,
              // productsCount,
            });
          }
        });
      }
    });
};

// Delete Hotel
exports.deleteHotel = async (req, res, next) => {
  const hotel = await Hotel.findById(req.params.id);
  // console.log(">>>>>",hotel)

  await hotel.remove();

  res.status(201).json({
    success: true,
    message: "Hotel Delete Successfully",
  });
};

//get hotel Detail by Id
exports.GetHotelById = async (req, res) => {
  const id = req.params.id;
  //  console.log(id)
  //  res.send(id)
  try {
    const hotel = await Hotel.findById(id);

    if (hotel) {
      return res.status(200).json({
        success: true,
        hotel,
      });
    }
  } catch (error) {
    console.log(error.message);
  }
};

exports.getHotelRooms = async (req, res, next) => {
  try {
    const hotel = await Hotel.findById(req.params.id);
    const list = await Promise.all(
      hotel.rooms.map((room) => {
        return Room.findById(room);
      })
    );
    res.status(200).json(list);
  } catch (err) {
    next(err);
  }
};

// exports.countByType = async (req, res, next) => {
//   try {
//     const hotelCount = await Hotel.countDocuments({ type: "hotel" });
//     const apartmentCount = await Hotel.countDocuments({ type: "apartment" });
//     const resortCount = await Hotel.countDocuments({ type: "resort" });
//     const villaCount = await Hotel.countDocuments({ type: "villa" });
//     const cabinCount = await Hotel.countDocuments({ type: "cabin" });

//     res.status(200).json([
//       { type: "hotel", count: hotelCount },
//       { type: "apartments", count: apartmentCount },
//       { type: "resorts", count: resortCount },
//       { type: "villas", count: villaCount },
//       { type: "cabins", count: cabinCount },
//     ]);
//   } catch (err) {
//     next(err);
//   }
// };
