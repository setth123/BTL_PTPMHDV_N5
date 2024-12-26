import express from "express";
import loginService from "../Services/authenService/loginServices.js";

const adminRouters=express.Router();
adminRouters.post('/',async(req,res)=>{
    const {username,password}=req.body;
    try{
        const token=await loginService(username,password);
        if(token!=null)
            return res.status(200).json(token);
        else return res.status(400).send("Invalid username or password");
    }
    catch(err){
        return res.status(500).json(err.message);
    }
});
export default adminRouters;