const express = require("express");
const router = express.Router();
const shortid = require("shortid");
const path = require("path");
const multer = require("multer");
const {
    addCar,
    getAllAdminCars,
    deleteCar,
    getCarBySlug,
    getAllCars,
    GetCarById,
    createCarReview,
    getCarReviews,
    deleteCarReview,
} = require("../Controllers/car");
const {
  requireSignin,
  adminMiddleware,
  userMiddleware,
} = require("../common-middleware");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(path.dirname(__dirname), "uploads"));
  },
  filename: function (req, file, cb) {
    cb(null, shortid.generate() + "-" + file.originalname);
  },
});
const upload = multer({ storage });
//For Admin
router.post(
  "/car/add",
  upload.array("carImages"),
  requireSignin,
  adminMiddleware,
  addCar
);
//For Admin
router.get("/admin/cars", requireSignin,
adminMiddleware,getAllCars);
//For Admin
// router.get("/admin/cars", requireSignin,
// adminMiddleware, getAllAdminCars);
//For Admin
router.get("/admin/car/:slug", requireSignin,
adminMiddleware, getCarBySlug);
//For Admin
router.post("/deletecar/:id", requireSignin,
adminMiddleware, deleteCar);
//For Admin
router.get("/admin/car-detail/:id", requireSignin,
adminMiddleware, GetCarById);

router.route("/create/car/review").put(requireSignin,userMiddleware, createCarReview);
router
  .route("/reviews")
  .get(getCarReviews)
  .delete(requireSignin,userMiddleware, deleteCarReview);


router.get("/cars",getAllCars);
router.get("/car/:slug", getCarBySlug);
router.get("/car-detail/:id", GetCarById);
// router.post(
//   "/vacation/category/update",
//   upload.array("categoryImage"),
//   updateVacationCategories
// );

module.exports = router;
