// createVacationProduct
const Package = require("../models/package");
const product = require("../models/vacationProduct");
const slugify = require('slugify');
const path = require("path");
const { truncate } = require("fs/promises");

// Create Package -- Admin
exports.createPackage = async(req, res, next) => {
  const {
    name,
    description,
    city,
    price,
    duration,
    refundable,
    product
  } = req.body;

  const package = await new Package({
    name: name,
    city: city,
    price: price,
    slug: slugify(name),
    packageImage: process.env.IMG_API + `/public/` + req.file.filename,
    description: description,
    duration: duration,
    refundable: refundable,
    product
    // createdBy: req.user._id,
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
        // file: req.files,
      });
    }
  });
};

// Get All Pacages (Admin)
exports.getAllPackages = async(req, res) => {
  const packages = await Package.find();
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

//get package Details by Id
exports.getPackageDetailsById = async(req, res) => {
  const id = req.params.id;
//  console.log(id)
//  res.send(id)
try {
  const package = await Package.findById(id)
  // const package = await Package.findById({ _id: id})
  // if(!package){
  //   return res.status(400).json({
  //     success:false,
  //     message:"No Package Found"
  //   })
  // }
  if(package){
    return res.status(200).json({
      success:true,
      package
    })
    
  }
} catch (error) {
  console.log(error.message)
}
};
// Delete Package
exports.deletePackage = async(req, res, next) => {
  const package = await Package.findById(req.params.id);
  // console.log(">>>>>",package)

  await package.remove();

  res.status(201).json({
    success: true,
    message: "Package Delete Successfully",
  });
};