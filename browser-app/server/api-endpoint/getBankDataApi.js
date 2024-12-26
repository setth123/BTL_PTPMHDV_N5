import express from "express"
import {getBanks, getBankList} from "../services/getBankData.js";
const bankDtRouter=express.Router();
bankDtRouter.get("/:field",async(req,res)=>{
    const {field}=req.params;
    try{
        const data=await getBanks(field)
        res.status(200).json(data)
    }
    catch(err){
        res.status(500).json(err.message)
    }
})

bankDtRouter.get('/', async(req, res) => {
    try {
        res.status(200).json(await getBankList())
    } catch (error) {
        res.status(500).json(err.message)
    }
})
export default bankDtRouter;