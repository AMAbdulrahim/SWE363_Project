const mongoose = require('mongoose');
const Event = require('../models/event'); // Go up one level and then into the models directory
const MONGO_URL = "mongodb://localhost:27017/dbApp";

mongoose.connect(MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("Database connected...");
    addEventIds();
}).catch(err => {
    console.error("Database connection error:", err);
});

async function addEventIds() {
    try {
        const events = await Event.find({}).sort('_id'); // Sort by _id or any other criteria if needed
        let idCounter = 1; // Starting ID

        for (const event of events) {
            event.eventId = idCounter; // Assuming you want to add 'eventId'
            await event.save();
            idCounter++;
        }

        console.log('All events have been updated with new IDs.');
        process.exit(0); // Exit the script when done
    } catch (error) {
        console.error('Error updating events:', error);
        process.exit(1);
    }
}
