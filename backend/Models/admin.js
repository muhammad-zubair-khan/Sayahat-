const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const saltRounds = 10;

const adminSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
      min: 3,
      max: 10,
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
      min: 3,
      max: 10,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    hash_password: {
        type: String,
        required: true,
      },
    phone: {
      type: String,
    },
    isAdmin: {
      type: Boolean,
      // enum: ["user", "admin"],
      required: true,
      default: true,
    },
  },
  { timestamps: true }
);
adminSchema.virtual('password').set(function (password) {
    this.hash_password = bcrypt.hashSync(password, saltRounds)
  });
  
  adminSchema.virtual('fullName').get(function (params) {
    return `${this.firstName} ${this.lastName}`;
  });
  
  adminSchema.methods = {
    authenticate: async function(password){
      return await bcrypt.compare(password,this.hash_password)
    },
  };

module.exports = mongoose.model("Admin", adminSchema);
