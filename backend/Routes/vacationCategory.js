const express = require("express");
const router = express.Router();
const {addVacationCategory,getVacationCategory} = require("../Controllers/vacationCategory");

router.post("/vacation/category",addVacationCategory);
router.get("/vacations/getcategories",getVacationCategory);


module.exports = router;
