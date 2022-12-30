// createVacationProduct
const Package = require("../models/package");
const product = require("../models/vacationProduct");
// const Topdes = require("../Models/destination");
const slugify = require('slugify');
const path = require("path");
const ErrorHandler = require("../utils/errorhandler");
const catchAsyncErrors = require("../utils/catchAsyncErrors");

// Create Package -- Admin
exports.createPackage =catchAsyncErrors(async(req, res) => {
  const {
    name,
    description,
    city,
    price,
    duration,
    refundable,
    startTime,
    title,
    carPickupDetails,
    product,
    createdBy,
  } = req.body;

  let packageImages = []
  if (req.files.length > 0) {
    packageImages = req.files.map((file) => {
      return { img: file.filename };
    });
  }

  const package = await new Package({
    name: name,
    city,
    price,
    slug: slugify(name),
    packageImages,
    description,
    duration,
    refundable,
    startTime,
    title,
    carPickupDetails,
    product,
    createdBy: req.user._id,
  });

  package.save((err, data) => {
    if (err) {
      return res.status(400).json({
        err,
      });
    }
    if (data) {
      return res.status(201).json({
        package,
        file: req.files,
      });
    }
  });
});

// Get All Pacages (Admin)
// exports.getAllPackages = async(req, res) => {
//   // const packages = await Package.find();
//   const { min, max, ...others } = req.query;
//   // const hotelsCount = await Hotel.countDocuments();

//   const packages = await Package.find({
//     ...others,
//     price: { $gt: min | 1, $lt: max || 99999 },
//   });
//   res.status(200).json(
//     packages,
//   );
// };

// Get All Pacages (Admin)
exports.getAllPackages = async(req, res) => {
  const packages = await Package.find();
  // if(!packages){
  //   return next(new ErrorHandler("Packages not found", 404));
  // }
  res.status(200).json({
    success: true,
    packages,
  });
};

//get package by slug
exports.getPackageBySlug = (req, res) => {
  // return next(new ErrorHander("this is my temp alert error",500))
  
  // const resultPerPage = 8;
  // const productsCount =  Product.countDocuments();
  
  const { slug } = req.params;
  product.findOne({ slug: slug })
  .select("_id")
  .exec((err, product) => {
    if (err) {
      return res.status(400).json({err});
    }
    if(!product){
      return res.status(400).json({
        success:false,
        message:"No Package Found"
      })
    }
    if (product) {
      Package.find({ product: product._id }).exec((error, package) => {
          if (error) {
            return res.status(400).json({
              error,
            });
          } else {
            res.status(200).json({
              success:true,
              package,
              // productsCount,
            });
          }
        });
      }
    });
};

//get top des package by slug
// exports.getTopDesPackageBySlug = (req, res) => {
//   const { slug } = req.params;
//   Topdes.findOne({ slug: slug })
//   .select("_id")
//   .exec((err, product) => {
//     if (err) {
//       return res.status(400).json({err});
//     }
//     if(!product){
//       return res.status(400).json({
//         success:false,
//         message:"No Package Found"
//       })
//     }
//     if (product) {
//       Package.find({ product: product._id }).exec((error, package) => {
//           if (error) {
//             return res.status(400).json({
//               error,
//             });
//           } else {
//             res.status(200).json({
//               success:true,
//               package,
//               // productsCount,
//             });
//           }
//         });
//       }
//     });
// };

//get package Details by Id
exports.getPackageDetailsById = async(req, res) => {
  const id = req.params.id;
//  console.log(id)
//  res.send(id)
  const package = await Package.findById(id)

  // if(!package){
  //   return next(new ErrorHandler("Package not found", 404));  
  // }
  return res.status(200).json({
    success:true,
    package
  })
};
// Delete Package
exports.deletePackage = catchAsyncErrors(async(req, res) => {
  const package = await Package.findById(req.params.id);
  if (!package) {
    return next(new ErrorHandler("Package not found", 404));
  }

  await package.remove();

  res.status(200).json({
    success: true,
    message: "Package Delete Successfully",
  });
});


// ------------------------------------------Review-Section---------------
// Create New Review or Update the review
exports.createPackageReview = catchAsyncErrors(async (req, res, next) => {
  const { rating, comment, id } = req.body;
  const review = {
    user: req.user._id,
    name: req.user._id,
    rating: Number(rating),
    comment,
  };
  const package = await Package.findById(id);
  const isReviewed = package.reviews.find(
    (rev) => rev.user.toString() === req.user._id.toString()
  );

  if (isReviewed) {
    package.reviews.forEach((rev) => {
      if (rev.user.toString() === req.user._id.toString())
        (rev.rating = rating), (rev.comment = comment);
    });
  } else {
    package.reviews.push(review);
    package.numOfReviews = package.reviews.length;
  }

  let avg = 0;

  package.reviews.forEach((rev) => {
    avg += rev.rating;
  });

  package.ratings = avg / package.reviews.length;

  await package.save({ validateBeforeSave: false });

  res.status(200).json({
    success: true,
  });
});

// Get All Reviews of a Paackage
exports.getPackageReviews = catchAsyncErrors(async (req, res, next) => {
  const package = await Package.findById(req.query.id);

  if (!package) {
    return next(new ErrorHandler("Package not found", 404));
  }

  res.status(200).json({
    success: true,
    reviews: package.reviews,
  });
});

// Delete Review
exports.deletePackageReview = catchAsyncErrors(async (req, res, next) => {
  const package = await Package.findById(req.query.id);

  if (!package) {
    return next(new ErrorHandler("Package not found", 404));
  }

  const reviews = package.reviews.filter(
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

  await Package.findByIdAndUpdate(
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