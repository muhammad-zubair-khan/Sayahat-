// createVacationProduct
const VacationProduct = require("../models/vacationProduct");
// const desModel = require("../Models/destination");
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
};


// Get All Product (Admin)
exports.getAllVacationsProducts = async (req, res, next) => {
    const products = await VacationProduct.find();
    // const destinations = await desModel.find()
  
    res.status(200).json({
      success: true,
      products,
      // destinations
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

//get product Details by Id
exports.getProductDetailById = async(req, res) => {
  const id = req.params.id;
//  console.log(id)
//  res.send(id)
try {
  const product = await VacationProduct.findById(id)

  if(product){
    return res.status(200).json({
      success:true,
      product
    })
    
  }
} catch (error) {
  console.log(error.message)
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