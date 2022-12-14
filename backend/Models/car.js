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
    passenger:{
        type: Number,
        required: true,
    },
    fare:{
        type: String,
    },
    mileage:{
        type: String,
    },
    payAt:{
        type: String,
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
    },
    carImage:{
        type:String
    },
    type:{
        type:String,
        required: true,
    },
    category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
    updatedAt: Date,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Car", carSchema);
