import express from "express";
import customerStaticService from "../Services/customerStaticService/customerStaticService.js";

const customerStaticRouter=express.Router();
customerStaticRouter.get('/',async(req,res)=>{
    try{
        return res.status(200).json(await customerStaticService());
    }
    catch(err){
        return res.status(500).json(err.message);
    }
})
export default customerStaticRouter;