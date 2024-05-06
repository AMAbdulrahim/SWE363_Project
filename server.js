import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import bodyParser from "body-parser";

const app = express();
dotenv.config();

const PORT = process.env.PORT || 7000;
const MONGO_URL = process.env.MONGO_URL;

var dbConn = mongoose.connect(MONGO_URL);


dbConn.then(() => {
        console.log("Database is connected..");
        app.listen(PORT, () => {
            console.log('Server is running on port %d', PORT);
        });
    })
    .catch((error) => {
        console.error("Error connecting to database:", error);
    });

const userSchema = new mongoose.Schema({
    name: 
    {type:  String,
        minlength: 6,
        maxlength: 255,
    },
    email: 
    { 
        type: String,
        maxlength: 255,
    },
    city: 
    {type:String,
    },
    password: 
    { type: String,
        minlength: 6,
        maxlength: 1024,
   }
});

const userModel = mongoose.model("users", userSchema);

app.use(bodyParser.urlencoded({ extended: false }));
// app.use(express.static(path.resolve(__dirname, 'public')));
app.use(bodyParser.json());
app.use(express.json());




app.post('/user', async (req, res) => {
    app.post('/post-feedback', function (req, res) {
        dbConn.then(function(db) {
            delete req.body._id; // for safety reasons
            db.collection('users').insertOne(req.body);
        });    
        res.send('Data received:\n' + JSON.stringify(req.body));
    });
});


// app.get("/getUsers", async (req, res) => {
//     try {
//         const userdata = await userModel.find({ name: "Ali" }).exec();
//         res.json(userdata);
//     } catch (error) {
//         console.error('Error fetching users:', error);
//         res.status(500).send('Error fetching users');
//     }
// });

// Additional routes can be defined here
