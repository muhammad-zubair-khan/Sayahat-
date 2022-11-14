// createVacationProduct
const VacationProduct = require("../models/vacationProduct");
const vacationCategoryModel = require("../Models/vacationCategory");
// const ErrorHander = require("../utils/errorhander");
// const catchAsyncErrors = require("../middleware/catchAsyncErrors.js");
// const ApiFeatures = require("../utils/apifeatures");
const slugify = require('slugify');
const path = require("path");
const fs = require('fs');

// Create VacationProduct -- Admin
exports.createVacationProduct = async(req, res, next) => {

  const {
    name,
    category,
  } = req.body;

  const product = await new VacationProduct({
    name: name,
    slug: slugify(name),
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
};


// Get All Product (Admin)
exports.getAllVacationsProducts = async (req, res, next) => {
    const products = await VacationProduct.find();
  
    res.status(200).json({
      success: true,
      products,
    });
  };


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