import express from "express";
import Car from "../Models/Car.js"
import editRecordService from "../Services/dataService/editRecordService.js";
const carRouter=express.Router();
carRouter.put('/editcar/:tableName/:id', async(req,res)=>{
    try {
        const { tableName, id } = req.params;
        const newData = req.body;
        const updatedRecord = await editRecordService(tableName, id, newData);
        res.status(200).json(updatedRecord);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
})
export default carRouter;