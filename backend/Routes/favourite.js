const express = require("express");
const { requireSignin, userMiddleware } = require("../common-middleware");
const router = express.Router();
const { saveFavourtieTrip,createTrip, getAllTrips,getTrip} = require("../Controllers/favourite");

router.post("/create/trip",requireSignin,userMiddleware,createTrip);
router.get("/trips",getAllTrips);
router.get("/trip/:id",getTrip);

router.post("/save/favourite", saveFavourtieTrip);
// router.post("/favorites/add/:itemId",addToFav)
// router.delete("/favorites/:itemId",remToFav)

module.exports = router;