// createVacationProduct
const Car = require("../models/car");
const Product = require("../models/vacationProduct");
const slugify = require("slugify");
const path = require("path");
const ErrorHandler = require("../utils/errorhandler");
const catchAsyncErrors = require("../utils/catchAsyncErrors");
const ApiFeatures = require("../utils/apifeatures");
// Create Car -- Admin
exports.addCar = catchAsyncErrors(async (req, res) => {
  const {
    name,
    passenger,
    price,
    mileage,
    payAt,
    shuttle,
    refund,
    discount,
    description,
    type,
    category,
    gear,
    featured,
    title,
    city,
    createdBy,
  } = req.body;

  let carImages = [];
  if (req.files.length > 0) {
    carImages = req.files.map((file) => {
      return { img: file.filename };
    });
  }

  const car = await new Car({
    name: name,
    slug: slugify(name),
    passenger,
    carImages,
    price,
    description,
    mileage,
    payAt,
    shuttle,
    refund,
    discount,
    type,
    gear,
    featured,
    city,
    title,
    category,
    createdBy: req.user._id,
  });

  car.save((err, data) => {
    if (err) {
      return res.status(400).json({
        err,
      });
    }
    if (data) {
      return res.status(201).json({
        car,
        file: req.files,
      });
    }
  });
});

// Get All Car 
// exports.getAllCars = async (req, res) => {
//   // const hotels = await Hotel.find();
//   // const { min, max, ...others } = req.query;
//   // // const hotelsCount = await Hotel.countDocuments();

//   //   const cars = await Car.find({
//   //     ...others,
//   //     fare: { $gt: min | 1, $lt: max || 99999 },
//   //   });
//   const apiFeature = new ApiFeatures(
//     Car.find(),
//     req.query
//   )
//     // .search()
//     .filter();

//   let cars = await apiFeature.query;
//   // console.log(cars)
//   // if (!cars) {
//   //   return next(new ErrorHandler("Cars not found", 404));
//   // }
//   res.status(200).json({
//     success: true,
//     cars,
//     // carsByFare: {
//     //   under5k: cars.filter((car) => car.fare <= 5000),
//     //   under6k: cars.filter((car) => car.fare > 5000 && car.fare <= 6000),
//     //   under7k: cars.filter((car) => car.fare > 6000 && car.fare <= 7000),
//     //   under8k: cars.filter((car) => car.fare > 7000 && car.fare <= 8000),
//     //   under9k: cars.filter((car) => car.fare > 8000 && car.fare <= 9000),
//     //   under10k: cars.filter((car) => car.fare > 9000 && car.fare <= 10000),
//     //   under11k: cars.filter((car) => car.fare > 10000 && car.fare <= 11000),
//     //   under12k: cars.filter((car) => car.fare > 11000 && car.fare <= 12000),
//     //   under13k: cars.filter((car) => car.fare > 12000 && car.fare <= 13000),
//     //   under14k: cars.filter((car) => car.fare > 13000 && car.fare <= 14000),
//     //   under15k: cars.filter((car) => car.fare > 14000 && car.fare <= 15000),
//     //   under16k: cars.filter((car) => car.fare > 15000 && car.fare <= 16000),
//     //   under17k: cars.filter((car) => car.fare > 16000 && car.fare <= 17000),
//     //   under18k: cars.filter((car) => car.fare > 17000 && car.fare <= 18000),
//     //   under19k: cars.filter((car) => car.fare > 18000 && car.fare <= 19000),
//     //   under20k: cars.filter((car) => car.fare > 19000 && car.fare <= 20000),
//     //   under21k: cars.filter((car) => car.fare > 20000 && car.fare <= 21000),
//     // },
//   });
// };


exports.getAllCars = async (req, res) => {
  const { min, max, ...others } = req.query;
  const apiFeature = new ApiFeatures(
    Car.find({
      ...others,
      price: { $gte: min || 1, $lte: max || 99999 },
      // ratings,
    })
  ).filter();
  const cars = await apiFeature.query;
  res.status(200).json({
    success: true,
    cars,
  });
};

// Get All Cars (Admin)
exports.getAllAdminCars = catchAsyncErrors(async (req, res) => {
  const cars = await Car.find();
  if (!cars) {
    return next(new ErrorHandler("Car not found", 404));
  }
  res.status(200).json({
    success: true,
    cars,
  });
});

//get car by slug
exports.getCarBySlug = (req, res) => {
  // return next(new ErrorHander("this is my temp alert error",500))

  // const resultPerPage = 8;
  // const productsCount =  Product.countDocuments();

  const { slug } = req.params;
  Product.findOne({ slug: slug })
    .select("_id")
    .exec((err, category) => {
      if (err) {
        return res.status(400).json({ err });
      }
      if (!category) {
        return res.status(400).json({
          success: false,
          message: "No car Found",
        });
      }
      if (category) {
        Car.find({ category: category._id }).exec((error, car) => {
          if (error) {
            return res.status(400).json({
              error,
            });
          } else {
            res.status(200).json({
              success: true,
              car,
              // productsCount,
            });
          }
        });
      }
    });
};

//get car Detail by Id
exports.GetCarById = catchAsyncErrors(async (req, res) => {
  const id = req.params.id;
  //  console.log(id)
  //  res.send(id)

  const car = await Car.findById(id);

  if (!car) {
    return next(new ErrorHandler("Car not found", 404));
  }
  res.status(200).json({
    success: true,
    car,
  });
});

// Delete Car
exports.deleteCar = catchAsyncErrors(async (req, res, next) => {
  const car = await Car.findById(req.params.id);
  if (!car) {
    return next(new ErrorHandler("Car not found", 404));
  }
  await car.remove();

  res.status(201).json({
    success: true,
    message: "Car Delete Successfully",
  });
});


// ------------------------------------------Review-Section---------------
// Create New Review or Update the review
exports.createCarReview = catchAsyncErrors(async (req, res, next) => {
  const { rating, comment, id } = req.body;
  const review = {
    user: req.user._id,
    name: req.user._id,
    rating: Number(rating),
    comment,
  };
  const car = await Car.findById(id);
  const isReviewed = car.reviews.find(
    (rev) => rev.user.toString() === req.user._id.toString()
  );

  if (isReviewed) {
    car.reviews.forEach((rev) => {
      if (rev.user.toString() === req.user._id.toString())
        (rev.rating = rating), (rev.comment = comment);
    });
  } else {
    car.reviews.push(review);
    car.numOfReviews = car.reviews.length;
  }

  let avg = 0;

  car.reviews.forEach((rev) => {
    avg += rev.rating;
  });

  car.ratings = avg / car.reviews.length;

  await car.save({ validateBeforeSave: false });

  res.status(200).json({
    success: true,
  });
});

// Get All Reviews of a Car
exports.getCarReviews = catchAsyncErrors(async (req, res, next) => {
  const car = await Car.findById(req.query.id);

  if (!car) {
    return next(new ErrorHandler("Car not found", 404));
  }

  res.status(200).json({
    success: true,
    reviews: car.reviews,
  });
});

// Delete Review
exports.deleteCarReview = catchAsyncErrors(async (req, res, next) => {
  const car = await Car.findById(req.query.id);

  if (!car) {
    return next(new ErrorHandler("Car not found", 404));
  }

  const reviews = car.reviews.filter(
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

  await Car.findByIdAndUpdate(
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