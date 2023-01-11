const express = require("express");
const {
    newBookPkg,
    myPackages,
  getPackageDetail,
  updateBookedPackageDetails,
  getAllBookedPackages,
  getBookedPackageDetail
//   myOrders,
//   getAllOrders,
//   updateOrder,
//   deleteOrder,
} = require("../../Controllers/booking/package");
const router = express.Router();

const {
    requireSignin,
    adminMiddleware,
    userMiddleware,
  } = require("../../common-middleware");

router.route("/book/package").post(requireSignin, newBookPkg);

router.route("/bookPackageDetail/:id").get(requireSignin, getPackageDetail);

router.route("/bookPackage/me").get(requireSignin,userMiddleware, myPackages);

router
  .route("/admin/bookedPackages")
  .get(requireSignin, adminMiddleware, getAllBookedPackages);

  router
  .route("/admin/bookedPackage/detail/:id")
  .get(getBookedPackageDetail);

router.patch('/admin/bookedPackage/update/:id',updateBookedPackageDetails);

// router
//   .route("/admin/orders")
//   .get(isAuthenticatedUser, authorizeRoles("admin"), getAllOrders);

// router
//   .route("/admin/order/:id")
//   .put(isAuthenticatedUser, authorizeRoles("admin"), updateOrder)
//   .delete(isAuthenticatedUser, authorizeRoles("admin"), deleteOrder);

module.exports = router;