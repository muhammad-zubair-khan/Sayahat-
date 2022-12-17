const Destination = require("../Models/destination");
const vacationCategoryModel = require("../Models/vacationCategory");
// const ErrorHander = require("../utils/errorhander");
// const catchAsyncErrors = require("../middleware/catchAsyncErrors.js");
// const ApiFeatures = require("../utils/apifeatures");
const slugify = require("slugify");
const path = require("path");

// Create Destination -- Admin
exports.createDestination = async (req, res, next) => {
  const { name, description, category } = req.body;

  const destination = await new Destination({
    name: name,
    slug: slugify(name),
    description: description,
    destinationPicture: process.env.IMG_API + `/public/` + req.file.filename,
    category,
    // createdBy: req.user._id,
  });

  // console.log(req.file)

  destination.save((err, destination) => {
    if (err) {
      return res.status(400).json({
        err,
      });
    }
    if (destination) {
      return res.status(201).json({
        destination,
      });
    }
  });
};

// Get All Destinatons (Admin)
exports.getAllDestinations = async (req, res, next) => {
  const destinations = await Destination.find();

  res.status(200).json({
    success: true,
    destinations,
  });
};

//get destination by slug
exports.getDestinationBySlug = (req, res) => {
  // return next(new ErrorHander("this is my temp alert error",500))

  // const resultPerPage = 8;
  // const productsCount =  Product.countDocuments();

  const { slug } = req.params;
  vacationCategoryModel
    .findOne({ slug: slug })
    .select("_id")
    .exec((err, category) => {
      if (err) {
        return res.status(400).json({ err });
      }
      if (category) {
        Destination.find({ category: category._id }).exec(
          (error, destination) => {
            if (error) {
              return res.status(400).json({
                error,
              });
            } else {
              res.status(200).json({
                success: true,
                destination,
                // productsCount,
              });
            }
          }
        );
      }
    });
};

//get destination Detail by Id
exports.getDestinationDetailById = async (req, res) => {
  const id = req.params.id;
  //  console.log(id)
  //  res.send(id)
  try {
    const destination = await Destination.findById(id);

    if (destination) {
      return res.status(200).json({
        success: true,
        destination,
      });
    }
  } catch (error) {
    console.log(error.message);
  }
};
// exports.getProductDetailById = async(req, res, next) => {
//   const { productId } = req.params;
//   const product = await VacationProduct.findOne({_id: productId});
//   if (!product) {
//     return res.status(400).json({success:false, message:"Product Not Found"});
//   }
//   res.status(200).json({
//     success: true,
//     product,
//   });
// };
