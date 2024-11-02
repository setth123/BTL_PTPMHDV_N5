import express from "express"
import mongoose from "mongoose"
import rateRouter from "./route/expectedRate.js";
import carRouter from "./route/carRouter.js";
import carVerRouter from "./route/carVerRouter.js";
import carByIdRouter from "./route/carByIdRouter.js";
import carVerByIdRouter from "./route/carVerByIdRouter.js";
import interestRateByIdRouter from "./route/interestRateByIdRouter.js";
import carVerByCarIdRouter from "./route/carVerByCarIdRouter.js";
const app=express();
app.use('/backend',rateRouter,carRouter,carVerRouter,
                   carByIdRouter,carVerByIdRouter,interestRateByIdRouter,carVerByCarIdRouter);

mongoose.connect("mongodb+srv://thanhtkcb2004:ksiuOWOBVmMF6sP5@cluster0.uuuqs.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
.then(()=>{
    console.log('yes');
    app.listen(4000,'0.0.0.0',()=>{
        console.log("success");
    })
})
.catch((err)=>{
    console.log(err.message);
})
