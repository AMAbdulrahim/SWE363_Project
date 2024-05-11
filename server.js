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

// Define Models
const User = require("./models/user");
const Event = require("./models/event")



// Define storage for the uploaded images
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './eventImgsUpload/'); // Set destination folder for uploaded files
    },
    filename: function(req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname)); // Set file name with timestamp
    }
});

// Initialize multer with defined storage
const upload = multer({ storage: storage });


// Define User Route
app.post('/user', async (req, res) => {
    try {
        // Check if email already exists
        const existingUser = await User.findOne({ email: req.body.email });
        if (existingUser) {
            return res.status(400).json({ message: 'Email already exists' });
        }

        // Hash the password
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
        // Fetch events from the database
        const events = await Event.find();

        // Send the events as JSON response
        res.json(events);
    } catch (error) {
        console.error("Error fetching events:", error.message);
        res.status(500).json({ message: 'Error fetching events' });
    }
});

// Event submission route with file upload
app.post('/submitEvent', upload.single('eventImage'), async (req, res) => {
    try {
        // Create a new event based on the submitted data
        const newEvent = new Event({
            eventName: req.body.eventName,
            eventDes: req.body.eventDes,
            eventDate: req.body.eventDate,
            eventTime: req.body.eventTime,
            eventImage: req.file ? req.file.path : '', // Store the path to the uploaded image file, if exists
            eventLoc: req.body.eventLoc
        });

        // Save the new event to the database
        await newEvent.save();

        // Send a success response
        res.status(201).json({ message: 'Event submitted successfully', event: newEvent });
    } catch (error) {
        console.error("Error submitting event:", error.message);
        res.status(500).json({ message: 'Error submitting event' });
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




    

    
  