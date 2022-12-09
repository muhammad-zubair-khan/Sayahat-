const express = require("express");
const router = express.Router();
const shortid = require("shortid");
const path = require("path");
const multer = require("multer");
const {
    createHotel,
    getAllHotels,
    deleteHotel,
} = require("../Controllers/hotel");

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
  "/vacation/Hotel/add",
  upload.single("hotelImage"),
  createHotel
);

router.get("/hotels", getAllHotels);
router.post("/vacation/hotel/:id", deleteHotel);
// router.post(
//   "/vacation/category/update",
//   upload.array("categoryImage"),
//   updateVacationCategories
// );

module.exports = router;
