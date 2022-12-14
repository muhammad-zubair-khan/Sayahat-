const mongoose = require("mongoose");
const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    description:{
      type: String,
      required: true,
      trim: true,
    },
    productVacationPicture: {
        type: String, 
        required:true
    },     
    category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
    // createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
    updatedAt: Date,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);
