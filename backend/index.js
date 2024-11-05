import express from "express"
import mongoose from "mongoose"
import rateRouter from "./route/rateRouters.js";
import carRouter from "./route/carRouters.js";
import cors from 'cors';
import carVerRouters from "./route/carVerRouters.js";

const app=express();
app.use(cors());
app.use('/rate',rateRouter);
app.use('/car',carRouter);
app.use('/carVer',carVerRouters);

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
