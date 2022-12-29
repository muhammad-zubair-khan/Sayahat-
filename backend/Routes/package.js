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
  "/package/create",
  upload.array("packageImages"),
  requireSignin,
  adminMiddleware,
  createPackage
);
//For Admin
router.get("/admin/all-packages",  requireSignin,
adminMiddleware, getAllPackages);
//For Admin
router.get("/admin/package/:slug",  requireSignin,
adminMiddleware, getPackageBySlug);
//For Admin
router.post("/admin/deletepackage/:id",  requireSignin,
adminMiddleware, deletePackage);
// For Admin
router.get("/admin/package/:slug",  requireSignin,
adminMiddleware, getPackageBySlug);
// For Admin
router.get('/admin/package-detail/:id', requireSignin,
adminMiddleware,getPackageDetailsById);

router.get("/all-packages", getAllPackages);
router.get("/package/:slug", getPackageBySlug);
router.get('/package-detail/:id', getPackageDetailsById);
// router.get("/top-des-package/:slug", getTopDesPackageBySlug);
// router.post(
//   "/vacation/category/update",
//   upload.array("categoryImage"),
//   updateVacationCategories
// );

module.exports = router;
