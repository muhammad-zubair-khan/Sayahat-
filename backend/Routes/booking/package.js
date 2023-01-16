const express = require("express");
const {
  newBookPkg,
  myPackages,
  getPackageDetail,
  updateBookedPackageDetails,
  getAllBookedPackages,
  getBookedPackageDetail,
} = require("../../Controllers/booking/package");
const router = express.Router();

const {
  requireSignin,
  adminMiddleware,
  userMiddleware,
} = require("../../common-middleware");

router.route("/book/package").post(requireSignin, newBookPkg);

router.route("/bookPackageDetail/:id").get(getPackageDetail);

router.route("/bookPackage/me").get(requireSignin, userMiddleware, myPackages);

router
  .route("/admin/bookedPackages")
  .get(requireSignin, adminMiddleware, getAllBookedPackages);

router.route("/admin/bookedPackage/detail/:id").get(getBookedPackageDetail);

router.patch("/admin/bookedPackage/update/:id", updateBookedPackageDetails);

module.exports = router;
