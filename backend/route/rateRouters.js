import express from "express";
import InterestRate from "../Models/InterestRate.js";
import editRecordService from "../Services/dataService/editRecordService.js";
import getDataService from "../Services/dataService/getDataService.js";

const rateRouters=express.Router();

rateRouters.get('/',async(req,res)=>{
    try{
        return res.status(200).json(await getDataService('InterestRate'));
    }
    catch(err){
        return res.status(500).json(err.message);
    }
})

rateRouters.get('/:id',async(req,res)=>{
    const id=req.params;
    try{
        return res.status(200).json(await getDataService('InterestRate',{id:id.id}));
    }
    catch(err){
        return res.status(500).json(err.message);
    }
});

rateRouters.put('/editrate', async(req,res)=>{
    try {
        const { tableName, id } = req.params;
        const newData = req.body;
        const updatedRecord = await editRecordService(tableName, id, newData);
        res.status(200).json(updatedRecord);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
})
export default rateRouters;