const express = require('express');
const cors =require('cors');
const mongoose =require('mongoose');
const userRoutes = require("./Routes/userRoutes")
const chatRoute =require("./Routes/chatRoute");

const app = express();
require("dotenv").config()
// this is must because to read the env file without this this shows an error like app ahs been crashed.

app.use(express.json())
app.use(cors())
app.use("/api/users",userRoutes);
app.use("/api/chats", chatRoute)

// CRUD

app.get('/',(req,res)=>{
    res.send("welcome to our chat app")
})

const port =process.env.PORT || 5000;
const uri = process.env.ATLAS_URI;

app.listen(port,(req, res) =>{
console.log(`server running on port: ${port}`);
})

mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() =>console.log("mongodb connection established"))
.catch((error) => console.log("mongodb connection has failed :", error.message))