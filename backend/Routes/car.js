const express = require("express");
const router = express.Router();
const shortid = require("shortid");
const path = require("path");
const multer = require("multer");
const {
    addCar,
    getAllCars,
    deleteCar,
    getCarBySlug,
} = require("../Controllers/car");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(path.dirname(__dirname), "uploads"));
  },
  filename: function (req, file, cb) {
    cb(null, shortid.generate() + "-" + file.originalname);
  },
});
const upload = multer({ storage });

router.post(
  "/car/add",
  upload.single("carImage"),
  addCar
);

router.get("/cars", getAllCars);
router.get("/car/:slug", getCarBySlug);

router.post("/deletecar/:id", deleteCar);
// router.post(
//   "/vacation/category/update",
//   upload.array("categoryImage"),
//   updateVacationCategories
// );

module.exports = router;
