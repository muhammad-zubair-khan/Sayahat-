const express = require("express");
const router = express.Router();
const shortid = require("shortid");
const path = require("path");
const multer = require("multer");
const {
  createPackage,
  getAllPackages,
  deletePackage,
  getPackageBySlug,
  getTopDesPackageBySlug,
  getPackageDetailsById,
  getAllAdminPackages,
  createPackageReview,
  getPackageReviews,
  deletePackageReview,
  getAllFeaturedPackages,
  favorite,
} = require("../Controllers/package");
const {
  requireSignin,
  adminMiddleware,
  userMiddleware,
} = require("../common-middleware");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(path.dirname(__dirname), "uploads"));
  },
  filename: function (req, file, cb) {
    cb(null, shortid.generate() + "-" + file.originalname);
  },
});
const upload = multer({ storage });
//For Admin
router.post(
  "/admin/package/create",
  upload.array("packageImages"),
  requireSignin,
  adminMiddleware,
  createPackage
);
//For Admin
router.get(
  "/admin/all-packages",
  requireSignin,
  adminMiddleware,
  getAllAdminPackages
);
//For Admin
router.get(
  "/admin/package/:slug",
  requireSignin,
  adminMiddleware,
  getPackageBySlug
);
//For Admin
router.post(
  "/admin/deletepackage/:id",
  requireSignin,
  adminMiddleware,
  deletePackage
);
// For Admin
router.get(
  "/admin/package/:slug",
  requireSignin,
  adminMiddleware,
  getPackageBySlug
);
// For Admin
router.get(
  "/admin/package-detail/:id",
  requireSignin,
  adminMiddleware,
  getPackageDetailsById
);
router.route('/packages/:id/favorite').post(favorite)
router
  .route("/create/review")
  .put(requireSignin, userMiddleware, createPackageReview);
router
  .route("/reviews")
  .get(getPackageReviews)
  .delete(requireSignin, userMiddleware, deletePackageReview);

router.get("/all-packages", getAllPackages);
router.get("/allfeaturedpackages", getAllFeaturedPackages);
router.get("/package/:slug", getPackageBySlug);
router.get("/package-detail/:id", getPackageDetailsById);
// router.get("/top-des-package/:slug", getTopDesPackageBySlug);
// router.post(
//   "/vacation/category/update",
//   upload.array("categoryImage"),
//   updateVacationCategories
// );

module.exports = router;
