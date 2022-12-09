const mongoose = require("mongoose");

const hotelSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    city:{
      type:String,
      required:true
    },
    slug: {
      type: String,
      required: true,
      unique: true,
    },
    hotelImage: {
      type: String,
    },
    pool: {
      type: Boolean,
    },
    Breakfast: {
      type: Boolean,
    },
    Hottub: {
      type: Boolean,
    },
    FullyRefundable: {
      type: Boolean,
    },
    ReserveNow: {
      type: Boolean,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    updatedAt: Date,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Hotel", hotelSchema);
