const express = require("express");
const router = express.Router();
const shortid = require("shortid");
const path = require("path");
const multer = require("multer");
const {
    createHotel,
    getAllHotels,
    deleteHotel,
    getHotelsBySlug,
    getTopDesHotelsBySlug,
    GetHotelById,
    countByType,
    getHotelRooms,
    getAllHotelsAdmin,
} = require("../Controllers/hotel");

const storage = multer.diskStorage({
  destination: (req, file, cb)=> {
    cb(null, path.join(path.dirname(__dirname), "uploads"));
  },
  filename: (req, file, cb)=> {
    cb(null, shortid.generate() + "-" + file.originalname);
  },
});
const upload = multer({ storage });

router.post(
  "/vacation/Hotel/add",
  upload.array("hotelImages"),
  createHotel
);

router.get("/all-hotels", getAllHotels);
//Admin
router.get("/admin/hotels", getAllHotelsAdmin);
router.get("/hotels/:slug", getHotelsBySlug);
router.get("/hotel/:id", GetHotelById);
// router.get("/top-des-hotels/:slug", getTopDesHotelsBySlug);

router.post("/vacation/hotel/:id", deleteHotel);
// router.post(
//   "/vacation/category/update",
//   upload.array("categoryImage"),
//   updateVacationCategories
// );
// router.get("/countByType", countByType);
router.get("/room/:id", getHotelRooms);
module.exports = router;
