const mongoose = require('mongoose');
const autoIncr = require('mongoose-sequence')(mongoose);
const Schema = mongoose.Schema;

const reviewSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
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
    }
});

module.exports = mongoose.model('Review', eventSchema);
