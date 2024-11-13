import express from "express";
import InterestRate from "../Models/InterestRate.js";
import editRecordService from "../Services/dataService/editRecordService.js";
import getDataService from "../Services/dataService/getDataService.js";
import delRecordService from "../Services/dataService/delRecordService.js";
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
// xóa theo id rate
rateRouters.delete('/:id', async (req, res) => {
    const { id } = req.params; // Extract the ID from params
    try {
        // Call the delete service with the given ID
        const deletedRecord = await delRecordService('InterestRate', id);
        // Check if a record was deleted; if not, return a 404 error
        if (!deletedRecord) {
            return res.status(404).json({ message: `Không thấy ${id}.` });
        }

        // If deletion was successful, return a success message with the deleted record
        return res.status(200).json({ message: "Bản ghi xóa thành công", data: deletedRecord });
    } catch (error) {
        // Handle any server errors and return a 500 status with the error message
        return res.status(500).json({ message: `Error deleting record: ${error.message}` });
    }
});
export default rateRouters;
