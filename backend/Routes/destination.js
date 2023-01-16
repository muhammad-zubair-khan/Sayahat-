const express = require("express");
const {
  createDestination,
  getAllDestinations,
  getDestinationBySlug,
  getDestinationDetailById,
} = require("../Controllers/destination");


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
.post("/admin/destination/new",upload.single("destinationPicture"),createDestination)

router.route("/view-all-destinations").get(getAllDestinations);

router.route("/destinations/:slug").get(getDestinationBySlug);

router.route("/destination-detail/:id").get(getDestinationDetailById);


module.exports = router;