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
    
    activity:{
        moth: String,
        hours: Number
    }
});

eventSchema.plugin(autoIncr,{inc_field:'id'})

module.exports = mongoose.model('Event', eventSchema);
