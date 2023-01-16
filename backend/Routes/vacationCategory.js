const express = require("express");
const router = express.Router();
const shortid = require("shortid");
const path = require("path");
const multer = require("multer");
const {
  addVacationCategory,
  getVacationCategory,
  deleteVacationCategory,
  updateVacationCategories,
} = require("../Controllers/vacationCategory");
const {
  requireSignin,
  superAdminMiddleware,
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
  "/admin/vacation/category/add",
  requireSignin,
  superAdminMiddleware,
  upload.single("categoryImage"),
  addVacationCategory
);
//For Admin
router.get("/admin/vacations/getcategories",requireSignin,
superAdminMiddleware, getVacationCategory);
//For Admin
router.post("/admin/vacation/category/delete",requireSignin,
superAdminMiddleware, deleteVacationCategory);
//For Admin
router.post(
  "/admin/vacation/category/update",
  requireSignin,
  superAdminMiddleware,
  upload.single("categoryImage"),
  updateVacationCategories
);

router.get("/vacations/getcategories", getVacationCategory);

module.exports = router;
