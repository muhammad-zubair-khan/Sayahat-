const mongoose = require("mongoose");
const carContactInfoSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    trim: true,
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: Number,
    required: true,
  },
  nic: {
    type: Number,
    required: true,
  },
});
module.exports = mongoose.model("CarContactInfo", carContactInfoSchema);
