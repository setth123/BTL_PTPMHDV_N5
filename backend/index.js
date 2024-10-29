import express from "express"
import mongoose from "mongoose"
import router from "./route/router.js"

const app=express();
app.use('/backend',router);

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
