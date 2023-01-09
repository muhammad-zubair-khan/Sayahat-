const mongoose = require("mongoose");

const bookCarSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  price: {
    type: Number,
  },
  DropoffTime: {
    type: String,
    required: true,
  },
  PickupTime: {
    type: String,
    required: true,
  },
  StartingDate: {
    type: String,
    required: true,
  },
  EndingDate: {
    type: String,
    required: true,
  },
  From: {
    type: String,
    required: true,
  },
  To: {
    type: String,
    required: true,
  },
  pickupDestination: {
    type: String,
    required: true,
  },
  CarContactInfo: {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
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
  },
  paymentInfo: {
    id: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
    },
  },
  city: {
    type: String,
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },
  paidAt: {
    type: Date,
    required: true,
  },
  bookingStatus: {
    type: String,
    required: true,
    default: "Booked",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  view:{
    type: String,
    default: "unread",
}
});

module.exports = mongoose.model("BookCar", bookCarSchema);
