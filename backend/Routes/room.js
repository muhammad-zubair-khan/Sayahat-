const express = require("express");
const {
  createRoom,
  deleteRoom,
  getRoom,
  getRooms,
  updateRoom,
  updateRoomAvailability,
} = require("../Controllers/room");
// import { verifyAdmin } from "../utils/verifyToken.js";

const router = express.Router();
//CREATE
router.post("/create/:hotelid", createRoom);

//UPDATE
router.put("/rooms/availability/:id", updateRoomAvailability);
router.put("/:id", updateRoom);

//DELETE
router.delete("/:id/:hotelid", deleteRoom);

//GET
router.get("/getRoomById/:id", getRoom);
//GET ALL

router.get("/rooms/all-rooms", getRooms);

module.exports = router;