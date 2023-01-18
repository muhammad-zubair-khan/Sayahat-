const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const saltRounds = 10;

const userSchema = new mongoose.Schema(
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
    userName:{
      type:String,
      required:true,
      trim:true,
      index:true,
      unique:true,
      lowercase:true
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
    role: {
      type: String,
      enum: ["user", "admin", "super-admin"],
      default: 'user',
    },
    profilePicture:{type:String},
    verifyToken:{
      type:String,
    }
  },
  { timestamps: true }
);
userSchema.virtual('password').set(function (password) {
    this.hash_password = bcrypt.hashSync(password, saltRounds)
  });
  
  userSchema.virtual('fullName').get(function (params) {
    return `${this.firstName} ${this.lastName}`;
  });
  
  userSchema.methods = {
    authenticate: async function(password){
      return await bcrypt.compare(password,this.hash_password)
    },
  };

module.exports = mongoose.model("User", userSchema);
