const express = require("express");
const {
  newBookHotel,
  myHotels,
  getHotelDetail,
  updateBookedHotelDetails,
  getAllBookedHotels,
  //   getAllOrders,
  //   updateOrder,
  //   deleteOrder,
} = require("../../Controllers/booking/hotel");
const router = express.Router();

const {
  requireSignin,
  adminMiddleware,
  userMiddleware,
} = require("../../common-middleware");

router.route("/book/hotel").post(requireSignin, newBookHotel);

router.route("/bookHotelDetail/:id").get(requireSignin, getHotelDetail);

router.route("/bookHotel/me").get(requireSignin, myHotels);

router
  .route("/admin/bookedHotels")
  .get(requireSignin, adminMiddleware, getAllBookedHotels);

router.patch(
  "/admin/bookedHotel/update/:id",
  adminMiddleware,
  updateBookedHotelDetails
);

// router
//   .route("/admin/orders")
//   .get(isAuthenticatedUser, authorizeRoles("admin"), getAllOrders);

// router
//   .route("/admin/order/:id")
//   .put(isAuthenticatedUser, authorizeRoles("admin"), updateOrder)
//   .delete(isAuthenticatedUser, authorizeRoles("admin"), deleteOrder);

module.exports = router;
