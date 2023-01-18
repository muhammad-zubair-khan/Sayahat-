// createVacationProduct
const VacationProduct = require("../models/vacationProduct");
// const desModel = require("../Models/destination");
const vacationCategoryModel = require("../Models/vacationCategory");
const ErrorHandler = require("../utils/errorhandler");
const catchAsyncErrors = require("../utils/catchAsyncErrors");
// const ApiFeatures = require("../utils/apifeatures");
const slugify = require('slugify');
const path = require("path");
const fs = require('fs');

// Create VacationProduct -- Admin
exports.createVacationProduct = catchAsyncErrors(async(req, res, next) => {

  const {
    name,
    description,
    category,
  } = req.body;

  const product = await new VacationProduct({
    name: name,
    slug: slugify(name),
    description: description,
    productVacationPicture: process.env.IMG_API + `/public/` + req.file.filename,
    category,
    // createdBy: req.user._id,
  });


  // console.log(req.file)
  

  product.save((err, product) => {
    if (err) {
      return res.status(400).json({
        err,
      });
    }
    if (product) {
      return res.status(201).json({
        product,
        // file: req.files,
      });
    }
  });
});


// Get All Product (Admin)
exports.getAllVacationsProducts = catchAsyncErrors(async(req, res, next) => {
    const products = await VacationProduct.find();

    res.status(200).json({
      success: true,
      products,
    });
  });


//get product by slug
exports.getProductsBySlug = (req, res) => {
  // return next(new ErrorHander("this is my temp alert error",500))
  
  // const resultPerPage = 8;
  // const productsCount =  Product.countDocuments();
  
  const { slug } = req.params;
  vacationCategoryModel.findOne({ slug: slug })
  .select("_id")
  .exec((err, category) => {
    if (err) {
      return res.status(400).json({err});
    }
    if (category) {
      VacationProduct.find({ category: category._id }).exec((error, product) => {
          if (error) {
            return res.status(400).json({
              error,
            });
          } else {
            res.status(200).json({
              success:true,
              product,
              // productsCount,
            });
          }
        });
      }
    });
};

//get product Details by Id
exports.getProductDetailById = async(req, res) => {
  const id = req.params.id;
//  console.log(id)
//  res.send(id)

  const product = await VacationProduct.findById(id)

  // if (!product) {
  //   return next(new ErrorHandler("Product not found", 404));
  // }
  res.status(200).json({
    success: true,
    product,
  });
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