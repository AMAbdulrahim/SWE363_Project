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

    },
    userType: 
    {
        type: String,
        enum: ['creator', 'volunteer'], // Ensures only 'creator' or 'volunteer' values are allowed
        default: 'volunteer' // Sets default value to 'volunteer'
    }
})

module.exports = mongoose.model("User", userSchema)
