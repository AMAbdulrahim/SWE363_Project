const dotenv = require("dotenv");
const mongoose = require("mongoose");
const express = require("express");
const bodyParser = require("body-parser");
const cors = require('cors');
const bcrypt = require('bcrypt');


const PORT = 8000;
const MONGO_URL = "mongodb://localhost:27017/dbApp";

const app = express();
dotenv.config();

// Middleware
app.use(cors()); // Enable CORS
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static('structure'));

// Define User Model
const User = require("./models/user");
const Event = require("./models/event")


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




    

    
  