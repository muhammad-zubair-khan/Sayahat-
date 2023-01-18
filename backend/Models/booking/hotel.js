const mongoose = require("mongoose");

const bookHotelSchema = new mongoose.Schema({
  name:{
    type:String,
  },
  price:{
    type:Number
  },
  hotelContactInfo: {
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
  },
  hotelActivityInfo: {
    dates: [
      {
        startDate: {
          type: String,
        },
        endDate: {
          type: String,
        },
      },
    ],
    firstName: {
      type: String,
    },
    lastName: {
      type: String,
    },
    options: [
      {
        adult:{
          type:Number,
        },
        children:{
          type:Number
        },
        room:{
          type:Number,
        }
      }
    ],
    time: {
      type: String,
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
  rooms:[
    {
        type:String,
    }
  ],
  city:{
    type:String,
  },
  fullyRefundable:{
    type:String,
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
  //   deliveredAt: Date,
  createdAt: {
    type: Date,
    default: Date.now,
  },
  view:{
    type: String,
    default: "unread",
}
});

module.exports = mongoose.model("BookHotel", bookHotelSchema);
