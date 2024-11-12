import express from "express";
import InterestRate from "../Models/InterestRate.js";
import editRecordService from "../Services/dataService/editRecordService.js";

const rateRouters=express.Router();
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