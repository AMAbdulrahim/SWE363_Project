const dotenv = require("dotenv");
const mongoose = require("mongoose");
const express = require("express");
const bodyParser = require("body-parser");
const cors = require('cors');
const bcrypt = require('bcrypt');
const multer = require('multer');
const path = require('path');


const PORT = 8000;
const MONGO_URL = "mongodb://localhost:27017/dbApp";

const app = express();
dotenv.config();

// Middleware
app.use(cors()); // Enable CORS
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static('structure'));
app.use('/eventImgsUpload', express.static('eventImgsUpload'));

const User = require("./structure/models/user");
const Event = require("./structure/models/event");
const event = require("./structure/models/event");


app.get('/', function(req, res) {
    res.redirect('/login.html');
});


const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './eventImgsUpload/'); 
    },
    filename: function(req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname)); 
    }
});

// Initialize multer with defined storage

const upload = multer({ storage: storage });


app.post('/upload', upload.single('image'), (req, res) => {

    res.send('File uploaded successfully');
});



app.post('/user', async (req, res) => {
    try {
        const existingUser = await User.findOne({ email: req.body.email });
        if (existingUser) {
            return res.status(400).json({ message: 'Email already exists' });
        }

        const hashedPassword = await bcrypt.hash(req.body.password, 10); // 10 is the saltRounds parameter

        // If email is unique, create a new user with hashed password
        const newUser = new User({
            name: req.body.name,
            email: req.body.email,
            city: req.body.city,
            userType: req.body.userType, // Add userType field based on the selected radio button
            password: hashedPassword // Store the hashed password in the database
        });
        await newUser.save();
        res.status(201).json(newUser);
    } catch (error) {
        console.error("Error creating user:", error.message);
        res.status(500).json({ message: 'Error creating user' });
    }
});

// Define Login Route
app.post('/login', async (req, res) => {
    try {
        // Find user by email
        const user = await User.findOne({ email: req.body.email });

        // Check if user exists
        if (!user) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        // Compare hashed password with entered password
        const passwordMatch = await bcrypt.compare(req.body.password, user.password);

        if (!passwordMatch) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        // If email and password are valid, log in user
        res.status(200).json({ message: 'Login successful', user: user });
    } catch (error) {
        console.error("Error logging in:", error.message);
        res.status(500).json({ message: 'Error logging in' });
    }
});

// Events endpoint
app.get('/events', async (req, res) => {
    try {
        const events = await Event.find(); // Use Mongoose to fetch all events from your database
        res.json(events); // Send the events back to the client as JSON
    } catch (error) {
        console.error("Error fetching events:", error);
        res.status(500).json({ message: 'Error fetching events' });
    }
});

//get event by id 
app.get('/events/:eventId', async (req, res) => {
    try {
        const event = await Event.findById(req.params.eventId);
        if (!event) {
            return res.status(404).send('Event not found');
        }
        res.json(event);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching event: ' + error.message });
    }
});

//update event 
app.put('/events/:eventId', async (req, res) => {
    const { eventId } = req.params;
    const eventUpdates = req.body;
    console.log(eventId);
    console.log(eventUpdates);

    try {
        // Update the event with new data
        const updatedEvent = await Event.findByIdAndUpdate(eventId, eventUpdates, { new: true });

        if (!updatedEvent) {
            return res.status(404).send('Event not found');
        }

        res.json(updatedEvent);
    } catch (error) {
        res.status(500).json({ error: 'Error updating event: ' + error.message });
    }
});

// event submit 
app.post('/submitEvent', upload.single('eventImage'), async (req, res) => {
    try {
        // Find the maximum eventId in the collection
        const lastEvent = await Event.findOne().sort({eventId: -1});
        const nextEventId = lastEvent ? lastEvent.eventId + 1 : 1; // Start from 1 if no events are present
        const creatorEmail = req.body.creatorEmail;
        const hours = req.body.eventHours
        console.log(hours)

        const creator = await User.findOne({ email: creatorEmail });
        if (!creator) {
            return res.status(404).json({ message: 'Creator not found' });
        }

        // Create a new event based on the submitted data with the next eventId
        const newEvent = new Event({
            eventName: req.body.eventName,
            eventDes: req.body.eventDes,
            eventCity: req.body.eventCity,
            eventDate: req.body.eventDate,
            eventEmail: req.body.eventEmail,
            eventTime: req.body.eventTime,
            eventImage: req.file ? req.file.path : '', // Store the path to the uploaded image file, if exists
            eventLoc: req.body.eventLoc,
            eventId: nextEventId, // Assign the calculated eventId
            creatoremail:creatorEmail,
            creator: creator,
            hours: hours
        });

        // Save the new event to the database
        await newEvent.save();

        // Add the event to the creator's list of events
        creator.events.push(newEvent._id);
        await creator.save();

        // Send a success response
        res.status(201).json({ message: 'Event submitted successfully', event: newEvent });
    } catch (error) {
        console.error("Error submitting event:", error.message);
        res.status(500).json({ message: 'Error submitting event' });
    }
});



// Update User Information
app.post('/updateUser/:userId', async (req, res) => {
    console.log('User ID:', req.params.userId);
    console.log('Request Body:', req.body);
    const { userId } = req.params;
    const { name, email, city, password } = req.body;

    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        //validate the inputs here
        if (email) {
            const existingUser = await User.findOne({ email });
            if (existingUser && existingUser._id.toString() !== userId) {
                return res.status(400).json({ message: 'Email already in use by another account' });
            }
            user.email = email;
        }

        user.name = name || user.name;
        user.city = city || user.city;

        if (password) {
            user.password = await bcrypt.hash(password, 10);
        }

        await user.save();
        res.status(200).json({ message: 'User updated successfully', user: user });
    } catch (error) {
        console.error("Error updating user:", error.message);
        res.status(500).json({ message: 'Error updating user', error: error.message });
    }
});



//delete the event 
app.delete('/events/:eventId', async (req, res) => {
    try {
        const { eventId } = req.params;
        const { userId } = req.body; 

        // Delete the event
        const event = await Event.findByIdAndDelete(eventId);
        if (!event) {
            return res.status(404).send('Event not found');
        }

        // Remove the event from the user's events array
        if (userId) {
            await User.findByIdAndUpdate(userId, { $pull: { events: eventId } });
        }

        res.send({ message: 'Event deleted successfully' });
    } catch (error) {
        console.error("Error deleting event:", error);
        res.status(500).json({ message: 'Failed to delete event', error: error.message });
    }
});


// get event info for the creator 
app.get('/users/:userId/events/:eventId', async (req, res) => {
    const { userId, eventId } = req.params;

    try {
        const user = await User.findById(userId).populate({
            path: 'events',
            match: { _id: eventId }
        });

        if (!user) {
            return res.status(404).send('User not found');
        }

        const event = user.events.length > 0 ? user.events[0] : null;

        if (!event) {
            return res.status(404).send('Event not found');
        }

        res.json(event);
    } catch (error) {
        console.error("Error fetching event:", error);
        res.status(500).send('Internal Server Error');
    }
});

///the creator events and voluntered 
app.get('/users/:userId/events', async (req, res) => {
    try {
        const { userId } = req.params;
        const user = await User.findById(userId).populate('events');
        if (!user) {
            return res.status(404).send('User not found');
        }
        res.json(user.events);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


//to add volunteres to events and event to volunters 
app.post('/events/:eventId/volunteers', async (req, res) => {
    const { eventId } = req.params;
    const { userId } = req.body;

    try {
        const event = await Event.findById(eventId);
        const user = await User.findById(userId);
        if (!event || !user) {
            return res.status(404).send('Event or User not found');
        }

        // Prevent duplicate volunteering
        if (!event.volunteers.includes(userId)) {
            event.volunteers.push(userId);
            await event.save();
        }

        // Optionally add event to user's volunteered events list
        if (!user.events.includes(eventId)) {
            user.events.push(eventId);
            await user.save();
        }

        res.status(200).json({ message: 'Successfully volunteered for the event' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


// for activity 
app.get('/user/:userId/monthlyActivity', async (req, res) => {
    try {
        const { userId } = req.params;
        const user = await User.findById(userId).populate('events');
        if (!user) {
            return res.status(404).send('User not found');
        }

        // Prepare data for monthly activity
        let monthlyActivity = {
            "Jan": 0, "Feb": 0, "Mar": 0, "Apr": 0, "May": 0, "Jun": 0,
            "Jul": 0, "Aug": 0, "Sep": 0, "Oct": 0, "Nov": 0, "Dec": 0
        };

        user.events.forEach(event => {
            let month = new Date(event.eventDate).toLocaleString('en-us', { month: 'short' });
            monthlyActivity[month] = (monthlyActivity[month] || 0) + event.hours;
        });

        const totalEvents = user.events.length;

        res.json({ monthlyActivity, totalEvents });
    } catch (error) {
        console.error('Failed to fetch user monthly activity:', error);
        res.status(500).send('Internal Server Error');
    }
});

app.post('/events/:eventId/reviews', async (req, res) => {
    try {
        const { userId, rating, text } = req.body;
        const { eventId } = req.params;

        if (!userId || !rating || !text) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        const event = await Event.findById(eventId);
        if (!event) {
            return res.status(404).json({ message: 'Event not found' });
        }

        // Add the review to the event's reviews array
        event.reviews.push({ userId, rating, text });

        await event.save();
        res.status(201).json({ message: 'Review added successfully', review: { userId, rating, text } });
    } catch (error) {
        console.error('Failed to add review:', error);
        res.status(500).json({ message: 'Failed to add review', error: error.message });
    }
});

// Assuming your server is set up with Express and uses Mongoose to interact with MongoDB
app.get('/users/:userId', async (req, res) => {
    try {
        const user = await User.findById(req.params.userId).select('name'); // Only fetch the user's name
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(user);
    } catch (error) {
        console.error("Error fetching user:", error);
        res.status(500).json({ message: 'Error fetching user details', error: error.message });
    }
});


// Connect to MongoDB
mongoose.connect(MONGO_URL)
    .then(() => {
        console.log("Database connected...");
        // Start the server after the database connection is established
        const PORT = process.env.PORT || 8000;
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    })
    .catch((error) => {
        console.error("Error connecting to database:", error.message);
    });




    

    
  