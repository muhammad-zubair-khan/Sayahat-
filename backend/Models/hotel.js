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
      type: String,
    },
    Breakfast: {
      type: String,
    },
    Hottub: {
      type: String,
    },
    FullyRefundable: {
      type: String,
    },
    // ReserveNow: {
    //   type: String,
    // },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
    updatedAt: Date,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Hotel", hotelSchema);
