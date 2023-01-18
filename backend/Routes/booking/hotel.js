const express = require("express");
const {
  newBookHotel,
  myHotels,
  getHotelDetail,
  updateBookedHotelDetails,
  getAllBookedHotels,
  getBookedHotelDetail,
  deleteBookedHotel,
} = require("../../Controllers/booking/hotel");
const router = express.Router();

const {
  requireSignin,
  adminMiddleware,
  userMiddleware,
} = require("../../common-middleware");

router.route("/book/hotel").post(requireSignin, newBookHotel);

router.route("/bookHotelDetail/:id").get(getBookedHotelDetail);

router.route("/bookHotel/me").get(requireSignin, userMiddleware, myHotels);

router
  .route("/admin/bookedHotels")
  .get(requireSignin, adminMiddleware, getAllBookedHotels);

router.route("/admin/bookedHotel/detail/:id").get(getBookedHotelDetail);

router.patch("/admin/bookedHotel/update/:id", updateBookedHotelDetails);
// For Admin
router.delete("/admin/bookedHotel/delete/:id", deleteBookedHotel);

router.delete(
  "/bookedHotel/delete/:id",
  requireSignin,
  userMiddleware,
  deleteBookedHotel
);

module.exports = router;
