const mongoose = require('mongoose');

const tripSchema = new mongoose.Schema({
  name: {
    type: String,
    // required: true,
  },
  description:{
    type: String,
  },
  packageId:{
    type: [String]
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    // required: true,
  },
  updatedAt: Date,
},
{ timestamps: true }
);

module.exports = mongoose.model("Trip", tripSchema);
