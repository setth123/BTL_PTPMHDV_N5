import express from "express";
import Car from "../Models/Car.js"
import editRecordService from "../Services/dataService/editRecordService.js";
import getDataService from "../Services/dataService/getDataService.js";
const carRouter=express.Router();

carRouter.get('/',async(req,res)=>{
    try{
        return res.status(200).json(await getDataService('Car'));
    }
    catch(err){
        return res.status(500).json(err.message);
    }
})
carRouter.get('/:id',async(req,res)=>{
    const id=req.params;
    try{
        return res.status(200).json(await getDataService('Car',{_id:id.id}));
    }
    catch(err){
        return res.status(500).json(err.message);
    }
})

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