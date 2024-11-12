import express from "express";
import carVer from "../Models/CarVersion.js";
import editRecordService from "../Services/dataService/editRecordService.js";

const carVerRouter=express.Router();
carVerRouter.put('/editcarver', async(req,res)=>{
    try {
        const { tableName, id } = req.params;
        const newData = req.body;
        const updatedRecord = await editRecordService(tableName, id, newData);
        res.status(200).json(updatedRecord);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
})
export default carVerRouter;