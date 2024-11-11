import express from "express"
import mongoose from "mongoose"
import rateRouter from "./route/rateRouters.js"
import carRouter from "./route/carRouters.js";
import cors from 'cors';
import carVerRouters from "./route/carVerRouters.js";
import adminRouters from "./route/adminRouters.js";
import verifyToken from "./middlewares/verify.js";
import getDataService from "./Services/dataService/getDataService.js";

const app=express();
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({extended:true}));
//verifyToken to verify admin before doing any actions
app.use('/rate',verifyToken,rateRouter);
app.use('/car',verifyToken,carRouter);
app.use('/carVer',verifyToken,carVerRouters);
app.use('/admin',adminRouters);

mongoose.connect("mongodb+srv://thanhtkcb2004:ksiuOWOBVmMF6sP5@cluster0.uuuqs.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
.then(async()=>{
    console.log('yes');
    app.listen(4000,'0.0.0.0', ()=>{
        console.log("success");
    })
})
.catch((err)=>{
    console.log(err.message);
})
