import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import carDtRouter from "./api-endpoint/getCarDataApi.js";
import carRecommendRouter from "./api-endpoint/rcmCarDataApi.js";
import filterBankRoute from "./api-endpoint/filterBankDataApi.js";
import bankDtRouter from "./api-endpoint/getBankDataApi.js";

import PriceRouter from "./api-endpoint/priceCalApi.js";
import getCarVerRouter from "./api-endpoint/getCarVerApi.js";
import downloadRouter from "./api-endpoint/downloadPriceCal.js";
const app=express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use('/chart',carDtRouter)
app.use('/recommendations',carRecommendRouter)
app.use('/filterBank', filterBankRoute)
app.use('/carChart',carDtRouter)
app.use('/bankChart',bankDtRouter)

// Sử dụng router
app.use(downloadRouter);

app.use('/carChart',carDtRouter)
app.use('/bankChart',bankDtRouter)
app.use(PriceRouter)
app.use(getCarVerRouter)
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
