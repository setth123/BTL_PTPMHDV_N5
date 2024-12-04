import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import carDtRouter from "./api-endpoint/getCarDataApi.js";
import carRecommendRouter from "./api-endpoint/rcmCarDataApi.js";

const app=express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/chart',carDtRouter)
app.use('/recommendations',carRecommendRouter)

mongoose.connect("mongodb+srv://thanhtkcb2004:ksiuOWOBVmMF6sP5@cluster0.uuuqs.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
.then(async()=>{
    console.log("Successfully connected to the database");
    app.listen(4000,()=>{
        console.log("Listening on port 4000")
    })
})
.catch((err)=>{
    console.log(err.message);
})
