const express = require("express");
const {
  newBookHotel,
  myHotels,
  getHotelDetail,
  updateBookedHotelDetails,
  getAllBookedHotels,
  getBookedHotelDetail,
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

router.route("/admin/bookedHotel/detail/:id").get(getBookedHotelDetail);

router.patch("/admin/bookedHotel/update/:id", updateBookedHotelDetails);

module.exports = router;
