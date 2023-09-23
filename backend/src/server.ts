import "dotenv/config"
import express from "express";
import mongoose from "mongoose";

//express app
const app = express()

app.get("/",(req,res) =>{
    res.send("hey")

})
const port = process.env.PORT

mongoose.connect(process.env.MONGO_URI!)
.then(()=>{
    console.log("mongoose connected");
    app.listen(port, ()=>{
        console.log("SERVER running" + port)
    })
    
})




