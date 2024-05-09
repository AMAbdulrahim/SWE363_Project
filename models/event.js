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
    }
});

module.exports = mongoose.model('event', eventSchema);
