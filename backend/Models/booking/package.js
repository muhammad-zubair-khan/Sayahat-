const mongoose = require("mongoose");

const bookPkgSchema = new mongoose.Schema({
  name:{
    type:String,
  },
  price:{
    type:Number
  },
  contactInfo: {
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
  activityInfo: {
    // dates: [{type:String,required:true}],
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
    travelDate:{
      type: String,
    }
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
  city:{
    type:String,
  },
  refundable:{
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
    default: "Processing",
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

module.exports = mongoose.model("BookPkg", bookPkgSchema);
