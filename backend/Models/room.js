const mongoose = require("mongoose");

const RoomSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    maxPeople: {
      type: Number,
      required: true,
    },
    desc: {
      type: String,
      required: true,
    },
    roomNumbers: [{ number: Number, unavailableDates: { type: [Date] } }],
    // room: { type: mongoose.Schema.Types.ObjectId, ref: 'Hotel', required: true },
  },

  { timestamps: true }
);

module.exports = mongoose.model("Room", RoomSchema);
