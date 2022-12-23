const mongoose = require("mongoose");

const packageSchema = new mongoose.Schema({
   name:{
    type: String,
    required: true,
    trim: true,
    unique: true,
   },
   price:{
    type:String,
    required:true,
   },
   city:{
    type: String,
   },
   description:{
    type: String,
    required:true
   },
   duration:{
    type: String,
    required:true
   },
   refundable:{
    type:String,
   },
   packageImages:[
    { 
      img: {
         type: String,
          required:true
        }
    }
  ],
   product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
    updatedAt: Date,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Package", packageSchema);
