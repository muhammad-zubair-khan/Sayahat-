const express = require("express");
const {
  createVacationProduct,
  getAllVacationsProducts,
  getProductsBySlug,
  getProductDetailById,
} = require("../Controllers/VacationProduct");
const {
  requireSignin,
  adminMiddleware,
} = require("../common-middleware");

const multer = require("multer");
const path = require("path");
const shortid = require("shortid");
const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(path.dirname(__dirname), "uploads"));
    // cb(null, "../dashboard/public/uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, shortid.generate() + "-" + file.originalname);
  },
});
const upload = multer({ storage });

//For Admin
router.post(
  "/admin/VacationProduct/new",
  upload.single("productVacationPicture"),
  requireSignin,
  adminMiddleware,
  createVacationProduct
);
//For Admin
router.get(
  "/admin/view-all-vacations",
  requireSignin,
  adminMiddleware,
  getAllVacationsProducts
);
//For Admin
router.get(
  "/admin/vacations/:slug",
  requireSignin,
  adminMiddleware,
  getProductsBySlug
);
//For Admin
router.get(
  "/admin/vacation-detail/:id",
  requireSignin,
  adminMiddleware,
  getProductDetailById
);

router.get("/view-all-vacations", getAllVacationsProducts);
router.get("/vacations/:slug", getProductsBySlug);
router.get("/vacation-detail/:id", getProductDetailById);

module.exports = router;
