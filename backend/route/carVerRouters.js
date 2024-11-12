import express from "express";
import carVer from "../Models/CarVersion.js";
import editRecordService from "../Services/dataService/editRecordService.js";
import getDataService from "../Services/dataService/getDataService.js";

const carVerRouter=express.Router();

carVerRouter.get('/',async(req,res)=>{
    try{
        return res.status(200).json(await getDataService('CarVersion'))
    }
    catch(err){
        return res.status(500).json(err.message);
    }
})

carVerRouter.get('/:id',async(req,res)=>{
    const id=req.params;
    try{
        return res.status(200).json(await getDataService('CarVersion',{id:id.id}));
    }
    catch(err){
        return res.status(500).json(err.message);
    }
})

carVerRouter.get('/Car/:carID',async(req,res)=>{
    const carID=req.params;
    try{
        return res.status(200).json(await getDataService('CarVersion',{carID:carID.carID}));
    }
    catch(err){
        return res.status(500).json(err.message);
    }
})

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