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
    roomNumbers: [{ number: String, unavailableDates: { type: [Date] } }],
    reviews: [
      {
          userId: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
          review: String
      }
  ],
  },

  { timestamps: true }
);

module.exports = mongoose.model("Room", RoomSchema);
