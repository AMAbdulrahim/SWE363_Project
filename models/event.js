const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
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
    }
    // volunteered : [user]

    // reviews: [{
    //     comment: {
    //         type: String,
    //         required: true
    //     },
    //     reviewerName: {
    //         type: String,
    //         required: true
    //     }
    // }]
});

module.exports = mongoose.model('Event', eventSchema);
