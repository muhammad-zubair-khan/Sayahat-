const express = require("express");
const {
    newBookCar,
    myCars,
  getCarDetail
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
  } = require("../../common-middleware");

router.route("/book/car").post(requireSignin, newBookCar);

router.route("/bookCarDetail/:id").get(requireSignin, getCarDetail);

router.route("/bookCar/me").get(requireSignin, myCars);

// router
//   .route("/admin/orders")
//   .get(isAuthenticatedUser, authorizeRoles("admin"), getAllOrders);

// router
//   .route("/admin/order/:id")
//   .put(isAuthenticatedUser, authorizeRoles("admin"), updateOrder)
//   .delete(isAuthenticatedUser, authorizeRoles("admin"), deleteOrder);

module.exports = router;