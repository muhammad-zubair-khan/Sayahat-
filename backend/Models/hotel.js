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
    ratings: {
      type: String,
      min: 0,
      max: 5,
      default:0
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
      default:false
    },
  //   reviews: [
  //     {
  //         userId: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
  //         review: String
  //     }
  // ],
  numOfReviews: {
    type: Number,
    default: 0,
  },
  reviews: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
      name: {
        type: String,
        required: true,
      },
      rating: {
        type: Number,
        required: true,
      },
      comment: {
        type: String,
        required: true,
      },
    },
  ],
  category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    updatedAt: Date,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Hotel", hotelSchema);
