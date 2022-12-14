// createVacationProduct
const Car = require("../models/car");
const category = require("../models/vacationProduct");
const slugify = require('slugify');
const path = require("path");

// Create Hotel -- Admin
exports.addCar = async(req, res, next) => {
  const {
    name,
    passenger,
    fare,
    mileage,
    payAt,
    shuttle,
    refund,
    discount,
    description,
    type,
    category
  } = req.body;

  const car = await new Car({
    name: name,
    slug: slugify(name),
    passenger: passenger,
    carImage: process.env.IMG_API + `/public/` + req.file.filename,
    fare: fare,
    description: description,
    mileage: mileage,
    payAt: payAt,
    shuttle: shuttle,
    refund: refund,
    discount: discount,
    type: type,
    category
    // createdBy: req.user._id,
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
        // file: req.files,
      });
    }
  });
};

// Get All Cars (Admin)
exports.getAllCars = async(req, res) => {
    const cars = await Car.find();
    res.status(200).json({
      success: true,
      cars,
    });
  };
  
//get car by slug
  exports.getCarBySlug = (req, res) => {
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
          message:"No car Found"
        })
      }
      if (category) {
        Car.find({ category: category._id }).exec((error, car) => {
            if (error) {
              return res.status(400).json({
                error,
              });
            } else {
              res.status(200).json({
                success:true,
                car,
                // productsCount,
              });
            }
          });
        }
      });
  };


// Delete Car
exports.deleteCar = async(req, res, next) => {
  const car = await Car.findById(req.params.id);
  // console.log(">>>>>",hotel)

  await car.remove();

  res.status(201).json({
    success: true,
    message: "Car Delete Successfully",
  });
};