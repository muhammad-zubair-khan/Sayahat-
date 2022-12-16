const express = require("express");
const {
  createVacationProduct,
  getAllVacationsProducts,
  getProductsBySlug,
  getProductDetailById,
} = require("../Controllers/VacationProduct");


const multer = require("multer");
const path = require("path");
const shortid = require("shortid");
const router = express.Router();

const storage = multer.diskStorage({
    destination:  (req, file, cb)=> {
      cb(null, path.join(path.dirname(__dirname), 'uploads'));
      // cb(null, "../dashboard/public/uploads/");
    },
    filename:  (req, file, cb)=> {
      cb(null, shortid.generate() + "-" + file.originalname);
    },
  });
const upload = multer({storage})

router
.post("/admin/VacationProduct/new",upload.single("productVacationPicture"),createVacationProduct)

router.route("/view-all-vacations").get(getAllVacationsProducts);

router.route("/vacations/:slug").get(getProductsBySlug);

router.route("/vacation-detail/:id").get(getProductDetailById);


module.exports = router;