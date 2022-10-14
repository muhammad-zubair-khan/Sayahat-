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
    carImage:{
        type:String
    },
    parentId:{
        type:String
    }

});

module.exports = mongoose.model("Car", carSchema);
