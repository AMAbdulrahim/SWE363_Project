import express from "express"
import mongoose from "mongoose";
import dotenv from "dotenv"


const app = express();
dotenv.config();


const PORT = process.env.PORT || 7000;
const MONGOURL = process.env.MONGO_URL;


mongoose.connect(MONGOURL).then(()=>{
   console.log("Database is connected..");
   app.listen(PORT, ()=>{
      console.log('server is running on port %d', PORT)
   });
})
.catch((error) => console.error(error));


const userSchema = new mongoose.Schema({
   name: String,
   age: Number,
});

const userModel = mongoose.model("users", userSchema)


app.get("/getUsers", async(req, res)=>{
   const userdata = await userModel.find({name:"Ali"}).exec();
   // const userdata = await userModel.find();
   res.json(userdata)

})













