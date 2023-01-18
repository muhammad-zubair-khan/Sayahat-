const express = require("express");
const {
  newBookPkg,
  myPackages,
  getPackageDetail,
  updateBookedPackageDetails,
  getAllBookedPackages,
  getBookedPackageDetail,
  deleteBookedPackage,
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

router.delete(
  "/bookedPackage/delete/:id",
  requireSignin,
  userMiddleware,
  deleteBookedPackage
);

router
  .route("/admin/bookedPackages")
  .get(requireSignin, adminMiddleware, getAllBookedPackages);

router.route("/admin/bookedPackage/detail/:id").get(getBookedPackageDetail);

router.patch("/admin/bookedPackage/update/:id", updateBookedPackageDetails);

//For Admin
router.delete("/admin/bookedPackage/delete/:id", deleteBookedPackage);

module.exports = router;
