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
  "/vacation/category/add",
  upload.single("categoryImage"),
  addVacationCategory
);
router.get("/vacations/getcategories", getVacationCategory);
router.post("/vacation/category/delete", deleteVacationCategory);
router.post(
  "/vacation/category/update",
  upload.array("categoryImage"),
  updateVacationCategories
);

module.exports = router;
