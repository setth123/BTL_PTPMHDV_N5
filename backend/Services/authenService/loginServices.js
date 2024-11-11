import Admin from "../../Models/Admin.js"
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";


const JWT_Secret="Sep21th2thousand4";
const loginService=async(username,password)=>{
    try{
        const admin=await Admin.findOne({username});
        if(!admin)return res.status(400).send("Invalid username or password");
        const isMatch=await bcrypt.compare(password,admin.password);
        if(!isMatch)return res.status(400).send("Invalid username or password");

        //create token to do admin actions
        const token=jwt.sign(
            {adminId:admin._id,username:admin.username},
            JWT_Secret
        )
        return token;
    }
    catch(err){
        return {error:err.message};
    }
}

export default loginService;