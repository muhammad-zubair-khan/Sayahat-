const express = require("express");
const {
  newBookCar,
  myCars,
  getCarDetail,
  getAllBookedCars,
  updateBookedCarDetails,
  getBookedCarsDetails,
  //   myOrders,
  //   getAllOrders,
  //   updateOrder,
  //   deleteOrder,
} = require("../../Controllers/booking/car");
const router = express.Router();

const {
  requireSignin,
  adminMiddleware,
  userMiddleware,
  superAdminMiddleware
} = require("../../common-middleware");

router.route("/book/car").post(requireSignin, userMiddleware, newBookCar);

// router
//   .route("/bookCarDetail/:id")
//   .get(requireSignin, userMiddleware, getCarDetail);

router.route("/bookCar/me").get(requireSignin, userMiddleware, myCars);

router
  .route("/admin/bookedCars")
  .get(requireSignin, adminMiddleware, getAllBookedCars);
  
router
  .route("/admin/bookedCar/detail/:id")
  .get(getBookedCarsDetails);

router
  .route("/admin/bookedCars/update/:id")
  .patch(updateBookedCarDetails);

// router
//   .route("/admin/order/:id")
//   .put(isAuthenticatedUser, authorizeRoles("admin"), updateOrder)
//   .delete(isAuthenticatedUser, authorizeRoles("admin"), deleteOrder);

module.exports = router;
