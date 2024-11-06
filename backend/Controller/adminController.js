import Admin from "../Models/Admin.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";


const JWT_Secret='Sep21th2thousand4';
export const login=async(req,res)=>{
    const {username,password}=req.body;
    try{
        const admin=await Admin.findOne({username});
        if(!admin)return res.status(400).send("Admin not found");
        const isMatch=await bcrypt.compare(password,admin.password);
        if(!isMatch)return res.status(400).send("Invalid username or password");

        //create token to do admin actions
        const token=jwt.sign(
            {adminId:admin._id,username:admin.username},
            JWT_Secret
        )
        return res.status(200).json({token});
    }
    catch(err){
        res.status(500).json({message:err.message});
    }
}