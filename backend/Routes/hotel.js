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
    createHotelReview,
    getHotelReviews,
    deleteReview,
} = require("../Controllers/hotel");
// const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");
const {
  requireSignin,
  adminMiddleware,
  userMiddleware,
} = require("../common-middleware");

const storage = multer.diskStorage({
  destination: (req, file, cb)=> {
    cb(null, path.join(path.dirname(__dirname), "uploads"));
  },
  filename: (req, file, cb)=> {
    cb(null, shortid.generate() + "-" + file.originalname);
  },
});
const upload = multer({ storage });
// For Admin
router.post(
  "/vacation/Hotel/add",
  upload.array("hotelImages"),
  requireSignin,
  adminMiddleware,
  createHotel
);
// For Admin
router.get("/admin/hotels", requireSignin,
adminMiddleware, getAllHotels);
// For Admin
router.get("/admin/hotels/:slug", requireSignin,
adminMiddleware, getHotelsBySlug);
// For Admin
router.post("/vacation/hotel/:id", requireSignin,
adminMiddleware, deleteHotel);
// For Admin
router.get("/admin/room/:id", requireSignin,
adminMiddleware, getHotelRooms);
// For Admin
router.get("/admin/hotel/:id", requireSignin,
adminMiddleware, GetHotelById);


router.route("/review").put(requireSignin,userMiddleware, createHotelReview);

router
  .route("/reviews")
  .get(getHotelReviews)
  .delete(requireSignin,userMiddleware, deleteReview);

router.get("/all-hotels", getAllHotels);
router.get("/hotels/:slug", getHotelsBySlug);
router.get("/hotel/:id", GetHotelById);
router.get("/room/:id", getHotelRooms);
// router.get("/top-des-hotels/:slug", getTopDesHotelsBySlug);
// router.route("/review").put(isAuthenticatedUser, createProductReview);
// router.post(
//   "/vacation/category/update",
//   upload.array("categoryImage"),
//   updateVacationCategories
// );
// router.get("/countByType", countByType);


module.exports = router;
