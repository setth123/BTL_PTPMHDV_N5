import express from "express";
import CarVersion from "../Models/CarVersion.js";
import editRecordService from "../Services/dataService/editRecordService.js";
import getDataService from "../Services/dataService/getDataService.js";
import delRecordService from "../Services/dataService/delRecordService.js"
import addDataService from "../Services/dataService/addRecordService.js";
const carVerRouters=express.Router();

carVerRouters.get('/', async(req,res)=>{
    try{
        return res.status(200).json(await getDataService('CarVersion'));
    }
    catch(err){
        return res.status(500).json(err.message);
    }
})

carVerRouters.post('/', async (req, res) => {
    try {
        const newVer = req.body; // Dữ liệu từ form được gửi lên từ client
        const result = await addDataService('CarVersion', newVer);
        
        if (result) {
            return res.status(201).json({ message: 'Dữ liệu được thêm thành công', data: result });
        } else {
            return res.status(500).json({ message: 'Thêm dữ liệu thất bại' });
        }
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
});

export default carVerRouters;


carVerRouters.get('/:id',async(req,res)=>{
    const id=req.params;
    try{
        return res.status(200).json(await getDataService('CarVersion',{id:id.id}));
    }
    catch(err){
        return res.status(500).json(err.message);
    }
})

carVerRouters.get('/Car/:carID',async(req,res)=>{
    const carID=req.params;
    try{
        return res.status(200).json(await getDataService('CarVersion',{carID:carID.carID}));
    }
    catch(err){
        return res.status(500).json(err.message);
    }
})

carVerRouters.put('/editcarver/:tableName/:id', async(req,res)=>{
    try {
        const { tableName, id } = req.params;
        const newData = req.body;
        const updatedRecord = await editRecordService(tableName, id, newData);
        res.status(200).json(updatedRecord);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
})
// xóa carver theo id car 
carVerRouters.delete('/Car/:carID', async (req, res) => {
    const carID = req.params.carID; // Lấy carID từ params
    try {
        // Gọi hàm xóa với carID
        const deletedRecord = await delRecordService('CarVersion', carID);
        // Kiểm tra xem có bản ghi nào bị xóa không
        if (!deletedRecord) {
            return res.status(404).json({ message: `Không tìm thấy phiên bản xe với ID ${carID}` });
        }
        // Trả về thông báo thành công
        return res.status(200).json({ message: "Phiên bản xe đã được xóa thành công", deletedRecord });
        
    } catch (error) {
        // Xử lý lỗi
        return res.status(500).json({ message: error.message });
    }
});