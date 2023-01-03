// createVacationProduct
const Hotel = require("../models/hotel");
const User = require("../Models/user");
const RoomModal = require("../Models/room");
const category = require("../models/vacationProduct");
const topDest = require("../Models/destination");
const slugify = require("slugify");
const path = require("path");
const ApiFeatures = require("../utils/apifeatures");
const ErrorHandler = require("../utils/errorhandler");
const catchAsyncErrors = require("../utils/catchAsyncErrors");

// Create Hotel -- Admin
exports.createHotel = catchAsyncErrors(async (req, res, next) => {
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
    createdBy,
    featured,
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
    description,
    pool,
    Breakfast,
    Hottub,
    FullyRefundable,
    distance,
    cheapestPrice,
    address,
    title,
    type,
    featured,
    hotelImages: hotelImages,
    category,
    createdBy: req.user._id,
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
});

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

// Get All Hotel
// exports.getAllHotels = async (req, res) => {
//   // const hotels = await Hotel.find();
//   const { min, max, ...others } = req.query;
//   // const hotelsCount = await Hotel.countDocuments();

//   const hotels = await Hotel.find({
//     ...others,
//     cheapestPrice: { $gt: min | 1, $lt: max || 99999 },
//   });
//   // if(!hotels){
//   // return next(new ErrorHandler("Hotel not found", 404));

//   // }
//   res.status(200).json({
//     hotels,
//   });
// };


exports.getAllHotels = async (req, res) => {
  const { min, max, ratings, ...others } = req.query;
  const apiFeature = new ApiFeatures(
    Hotel.find({
      ...others,
      cheapestPrice: { $gte: min | 1, $lte: max || 99999 },
      // ratings,
    }).limit(req.query.limit)
  ).filter();
  const hotels = await apiFeature.query;
  res.status(200).json({
    success: true,
    hotels,
  });
};




// Get All Hotel (Admin)
exports.getAllHotelsAdmin = catchAsyncErrors(async (req, res) => {
  const hotels = await Hotel.find();
  if (!hotels) {
    return next(new ErrorHandler("Hotels not found", 404));
  }
  res.status(200).json({
    success: true,
    hotels,
  });
});

//get hotel by slug
exports.getHotelsBySlug = (req, res) => {
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
              priceRange: {
                under5k: 5000,
                under10k: 10000,
                under15k: 15000,
                under20k: 20000,
                under30k: 30000,
              },
              hotelsByPrice: {
                under5k: hotels.filter((hotel) => hotel.cheapestPrice <= 5000),
                under10k: hotels.filter(
                  (hotel) =>
                    hotel.cheapestPrice > 5000 && hotel.cheapestPrice <= 10000
                ),
                under15k: hotels.filter(
                  (hotel) =>
                    hotel.cheapestPrice > 10000 && hotel.cheapestPrice <= 15000
                ),
                under20k: hotels.filter(
                  (hotel) =>
                    hotel.cheapestPrice > 15000 && hotel.cheapestPrice <= 20000
                ),
                under30k: hotels.filter(
                  (hotel) =>
                    hotel.cheapestPrice > 20000 && hotel.cheapestPrice <= 30000
                ),
                
              },
            });
          }
          else{
            res.status(200).json({ hotels });
          }
        });
      }
    });
};

//get Top Des hotel by slug
// exports.getTopDesHotelsBySlug = (req, res) => {
//   const { slug } = req.params;
//   // category.findOne({ slug: slug })
//   topDest
//     .findOne({ slug: slug })
//     .select("_id")
//     .exec((err, category) => {
//       if (err) {
//         return res.status(400).json({ err });
//       }
//       if (!category) {
//         return res.status(400).json({
//           success: false,
//           message: "No Hotel Found",
//         });
//       }
//       if (category) {
//         Hotel.find({ category: category._id }).exec((error, hotel) => {
//           if (error) {
//             return res.status(400).json({
//               error,
//             });
//           } else {
//             res.status(200).json({
//               success: true,
//               hotel,
//               // productsCount,
//             });
//           }
//         });
//       }
//     });
// };

// Delete Hotel
exports.deleteHotel = catchAsyncErrors(async (req, res) => {
  const hotel = await Hotel.findById(req.params.id);
  // console.log(">>>>>",hotel)
  if (!hotel) {
    return next(new ErrorHandler("Hotel not found", 404));
  }
  await hotel.remove();

  res.status(201).json({
    success: true,
    message: "Hotel Delete Successfully",
  });
});

//get hotel Detail by Id
exports.GetHotelById = catchAsyncErrors(async (req, res) => {
  const id = req.params.id;
  //  console.log(id)
  //  res.send(id)

  const hotel = await Hotel.findById(id);

  if (!hotel) {
    return next(new ErrorHandler("Hotel not found", 404));
  }
  res.status(200).json({
    success: true,
    hotel,
  });
});

exports.getHotelRooms = async(req, res) => {
  const hotel = await Hotel.findById(req.params.id);
  if (!hotel) {
    // return next(new ErrorHandler("Hotel not found", 404));
    console.log("hotel not found")
  }
  const list = await Promise.all(
    hotel.rooms.map((room) => {
      return RoomModal.findById(room);
    })
    );
 
    // console.log("list>>",list)
    // res.status(200).json(list);
  res.status(200).json({
    success: true,
    list,
  });
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



// ------------------------------------------Review-Section---------------
// Create New Review or Update the review
exports.createHotelReview = catchAsyncErrors(async (req, res, next) => {
  const { rating, comment, id } = req.body;
  const review = {
    user: req.user._id,
    name: req.user._id,
    rating: Number(rating),
    comment,
  };
  const hotel = await Hotel.findById(id);
  const isReviewed = hotel.reviews.find(
    (rev) => rev.user.toString() === req.user._id.toString()
  );

  if (isReviewed) {
    hotel.reviews.forEach((rev) => {
      if (rev.user.toString() === req.user._id.toString())
        (rev.rating = rating), (rev.comment = comment);
    });
  } else {
    hotel.reviews.push(review);
    hotel.numOfReviews = hotel.reviews.length;
  }

  let avg = 0;

  hotel.reviews.forEach((rev) => {
    avg += rev.rating;
  });

  hotel.ratings = avg / hotel.reviews.length;

  await hotel.save({ validateBeforeSave: false });

  res.status(200).json({
    success: true,
  });
});

// Get All Reviews of a Hotel
exports.getHotelReviews = catchAsyncErrors(async (req, res, next) => {
  const hotel = await Hotel.findById(req.query.id);

  if (!hotel) {
    return next(new ErrorHandler("Hotel not found", 404));
  }

  res.status(200).json({
    success: true,
    reviews: hotel.reviews,
  });
});

// Delete Review
exports.deleteReview = catchAsyncErrors(async (req, res, next) => {
  const hotel = await Hotel.findById(req.query.id);

  if (!hotel) {
    return next(new ErrorHandler("Hotel not found", 404));
  }

  const reviews = hotel.reviews.filter(
    (rev) => rev._id.toString() !== req.query.id.toString()
  );

  let avg = 0;

  reviews.forEach((rev) => {
    avg += rev.rating;
  });

  let ratings = 0;

  if (reviews.length === 0) {
    ratings = 0;
  } else {
    ratings = avg / reviews.length;
  }

  const numOfReviews = reviews.length;

  await Hotel.findByIdAndUpdate(
    req.query.id,
    {
      reviews,
      ratings,
      numOfReviews,
    },
    {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    }
  );

  res.status(200).json({
    success: true,
  });
});