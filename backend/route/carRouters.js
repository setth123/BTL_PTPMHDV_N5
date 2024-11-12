import express from "express";
import Car from "../Models/Car.js"

const carRouter=express.Router();
carRouter.put('/editcar', async(req,res)=>{
    try {
        const { tableName, id } = req.params;
        const newData = req.body;
        const updatedRecord = await editRecordService(tableName, id, newData);
        if (!updatedRecord) {
            return res.status(404).json({ message: "Record not found or not updated" })
    }
    } catch (error) {
        res.status(500).json({message: 'Update error'});
    }
})
export default carRouter;