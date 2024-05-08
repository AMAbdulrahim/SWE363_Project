const mongoose = require('mongoose');
const { unique } = require('underscore');


const userSchema = new mongoose.Schema({

    name: 
    {
        type:  String,
        minlength: 3,
        maxlength: 255,
        required: true,
    },
    email: 
    { 
        type: String,
        maxlength: 255,
        required: true,
        unique: true,

    },
    city: 
    {
        type:String,
        required: true,

    },
    password: 
    { 
        type: String,
        minlength: 6,
        required: true,

   }
})

module.exports = mongoose.model("User", userSchema)
