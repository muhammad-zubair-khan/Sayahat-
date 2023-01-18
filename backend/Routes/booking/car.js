const express = require("express");
const {
  newBookCar,
  myCars,
  getAllBookedCars,
  updateBookedCarDetails,
  getBookedCarsDetails,
  deleteBookedCar,
  getCarDetail,
} = require("../../Controllers/booking/car");
const router = express.Router();

const {
  requireSignin,
  adminMiddleware,
  userMiddleware,
  superAdminMiddleware,
} = require("../../common-middleware");

router.route("/book/car").post(requireSignin, userMiddleware, newBookCar);

router.route("/bookCarDetail/:id").get(getBookedCarsDetails);

router.route("/bookCar/me").get(requireSignin, userMiddleware, myCars);

router
  .route("/admin/bookedCars")
  .get(requireSignin, adminMiddleware, getAllBookedCars);

router.route("/admin/bookedCar/detail/:id").get(getBookedCarsDetails);

router.route("/admin/bookedCars/update/:id").patch(updateBookedCarDetails);

//For Admin
router.delete("/admin/bookedCar/delete/:id", deleteBookedCar);

router.delete(
  "/bookedCar/delete/:id",
  requireSignin,
  userMiddleware,
  deleteBookedCar
);

module.exports = router;
