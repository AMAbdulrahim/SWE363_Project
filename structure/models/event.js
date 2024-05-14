const mongoose = require('mongoose');
const autoIncr = require('mongoose-sequence')(mongoose);


const eventSchema = new mongoose.Schema({
    id:
    {
        type:Number
    },
    eventName: {
        type: String,
        required: true
    },
    eventDes: {
        type: String,
        required: true
    },
    eventDate: {
        type: Date,
        required: true
    },
    eventTime: {
        type: String,
        required: true
    },
    eventImage: {
        type: String,
        required: false
    },
    eventLoc: {
        type: String,
        required: false
    },
    eventEmail: {
        type: String,
        required: false
    },
    eventCity: {
        type: String,
        required: false
    },
    creatoremail:{type: String },
    creator: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, 
    volunteers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    //
    hours:{ type: Number, default:0},
    month:{ type:String},
    //
    
//     activity:{
// <<<<<<< HEAD
//         month: String,
//         numberOfEvents: Number
//     }
// =======
//         moth: String,
//         hours: Number
//     },
    reviews:
    [{userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    rating: {
        type: Number,
        required: true,
        min: 1,   // Minimum rating value
        max: 5    // Maximum rating value
    },
    text: {
        type: String,
        required: true
    }}]
});

eventSchema.plugin(autoIncr,{inc_field:'id'})

module.exports = mongoose.model('Event', eventSchema);
