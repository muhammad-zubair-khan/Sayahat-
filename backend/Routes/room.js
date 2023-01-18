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
const {
  requireSignin,
  adminMiddleware,
  userMiddleware,
} = require("../common-middleware");

const router = express.Router();
//For Admin
router.post("/admin/create/:hotelId", requireSignin,
adminMiddleware, createRoom);
//For Admin
router.delete("/admin/:id/:hotelid", requireSignin,
adminMiddleware, deleteRoom);
//For Admin
router.get("/admin/getRoomById/:id", requireSignin,
adminMiddleware, getRoom);
//For Admin
router.get("/admin/rooms/all-rooms", requireSignin,
adminMiddleware, getRooms);

//UPDATE
router.put("/rooms/availability/:id", updateRoomAvailability);
router.put("/:id", updateRoom);
//GET
router.get("/getRoomById/:id", requireSignin,
userMiddleware, getRoom);


router.get("/rooms/all-rooms", requireSignin,
userMiddleware, getRooms);

module.exports = router;