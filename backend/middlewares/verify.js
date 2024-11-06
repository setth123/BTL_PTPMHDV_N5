import jwt from "jsonwebtoken";

const JWT_Secret="Sep21th2thousand4";
const verifyToken=async(req,res,next)=>{
    const header=req.headers['authorization'];
    const token=header && header.split(' ')[1];

    if(!token){
        return res.status(401).send("Token not found");
    }
    jwt.verify(token,JWT_Secret,(err,admin)=>{
        if(err)return res.status(403).send("Token invalid");
    })
    return next();
}
export default verifyToken;