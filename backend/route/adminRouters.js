import express from "express";
import loginService from "../Services/authenService/loginServices.js";

const adminRouters=express.Router();
adminRouters.post('/',async(req,res)=>{
    const {username,password}=req.body;
    try{
        const token=await loginService(username,password);
        return res.status(200).json(token);
    }
    catch(err){
        return res.status(500).json(err.message);
    }
});
export default adminRouters;