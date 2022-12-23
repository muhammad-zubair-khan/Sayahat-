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
    type:{
      type:String,
      required:true
    },
    slug: {
      type: String,
      required: true,
      unique: true,
    },
    title:{
      type:String,
      required:true
    },
    address:{
        type: String,
        required:true
    },
    distance:{
      type: String,
      required:true
    },
    hotelImages: [
      { 
        img: {
           type: String,
          required:true
          }
      }
    ],
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
    rating: {
      type: String,
      min: 0,
      max: 5
    },
    rooms:{
      type: [String]
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    cheapestPrice:{
      type: Number,
      required: true
    },
    featured:{
      type: Boolean,
      default: false
    },
    category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
    // room: { type: mongoose.Schema.Types.ObjectId, ref: 'Room', required: true },

    updatedAt: Date,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Hotel", hotelSchema);
