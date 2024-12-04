import express from "express"
import mongoose from "mongoose"
import rateRouter from "./route/rateRouters.js"
import carRouter from "./route/carRouters.js";
import cors from 'cors';
import carVerRouters from "./route/carVerRouters.js";
import adminRouters from "./route/adminRouters.js";
import verifyToken from "./middlewares/verify.js";
import getDataService from "./Services/dataService/getDataService.js";
import rateRouters from "./route/rateRouters.js";

const app=express();
app.use(cors());
app.use(cors({
    origin: 'http://localhost:4000', // địa chỉ của browser-app
    methods: ['GET', 'POST', 'PUT', 'DELETE']
  }));
app.use(express.json());
app.use(express.urlencoded({extended:true}));

//verifyToken to verify admin before doing any actions
app.use('/rate',rateRouters);
app.use('/car',carRouter);
app.use('/carVer', carVerRouters);
app.use('/admin',adminRouters);

mongoose.connect("mongodb+srv://thanhtkcb2004:ksiuOWOBVmMF6sP5@cluster0.uuuqs.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
.then(async()=>{
    console.log('yes');
    app.listen(3000,'0.0.0.0', ()=>{
        console.log("success");
    })
    console.log(await getDataService('CarVersion',{price:999}))
})
.catch((err)=>{
    console.log(err.message);
})
