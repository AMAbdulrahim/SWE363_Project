const dotenv = require("dotenv");
const mongoose = require("mongoose");
const express = require("express");
const bodyParser = require("body-parser");
const cors = require('cors');

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

// Define User Route
app.post('/user', async (req, res) => {
    try {
        // Check if email already exists
        const existingUser = await User.findOne({ email: req.body.email });
        if (existingUser) {
            return res.status(400).json({ message: 'Email already exists' }); // Return specific error message
        }

        // If email is unique, create a new user
        const newUser = new User({
            name: req.body.name,
            email: req.body.email,
            city: req.body.city,
            password: req.body.password
        });
        await newUser.save();
        res.status(201).json(newUser);
    } catch (error) {
        console.error("Error creating user:", error.message);
        res.status(500).json({ message: 'Error creating user' }); // Generic error message for other errors
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

        // Check if password is correct
        if (user.password !== req.body.password) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        // If email and password are valid, log in user
        res.status(200).json({ message: 'Login successful', user: user.name });
    } catch (error) {
        console.error("Error logging in:", error.message);
        res.status(500).json({ message: 'Error logging in' }); // Generic error message for other errors
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

