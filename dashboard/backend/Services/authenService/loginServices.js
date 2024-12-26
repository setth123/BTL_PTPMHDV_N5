import Admin from "../../Models/Admin.js"
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";


const JWT_Secret="Sep21th2thousand4";
const loginService=async(username,password)=>{
    try{
        const admin=await Admin.findOne({username});
        if(!admin)return null;
        const isMatch=await bcrypt.compare(password,admin.password);
        if(!isMatch)return null;

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