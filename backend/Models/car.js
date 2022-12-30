const mongoose = require('mongoose');

const carSchema = new mongoose.Schema({

    name:{
        type:String,
        required:true,
        trim:true
    },
    slug:{
        type:String,
        required:true,
        unique:true
    },
    title:{
        type:String,
        required:true,
    },
    passenger:{
        type: Number,
        required: true,
    },
    gear:{
        type:String,
    },
    city:{
        type:String,
        required:true,
    },
    fare:{
        type: String,
        required:true,
    },
    mileage:{
        type: String,
        required:true,
    },
    payAt:{
        type: String,
        required:true,
    },
    shuttle:{
        type: String,
    },
    refund:{
        type: String,
    },
    discount:{
        type: String,
    },
    description:{
        type: String,
        required:true,
    },
    carImages:[
        { 
          img: {
             type: String,
             required:true
            }
        }
      ],
    type:{
        type:String,
        required: true,
    },
    category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
    ratings: {
        type: String,
        min: 0,
        max: 5
      },
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
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    updatedAt: Date,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Car", carSchema);
