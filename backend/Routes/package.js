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
  "/package/create",
  upload.array("packageImage"),
  createPackage
);
router.get("/all-packages", getAllPackages);
// router.get("/admin/packages", getAllAdminPackages);
router.get("/package/:slug", getPackageBySlug);
// router.get("/top-des-package/:slug", getTopDesPackageBySlug);
router.get('/package-detail/:id',getPackageDetailsById)
router.post("/deletepackage/:id", deletePackage);
// router.post(
//   "/vacation/category/update",
//   upload.array("categoryImage"),
//   updateVacationCategories
// );

module.exports = router;
