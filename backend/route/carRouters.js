import express from "express";
import Car from "../Models/Car.js"
import editRecordService from "../Services/dataService/editRecordService.js";
import getDataService from "../Services/dataService/getDataService.js";
import delRecordService from "../Services/dataService/delRecordService.js"
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

// xoa theo id 
carRouter.delete('/:id', async (req, res) => {
  const id = req.params.id; // Lấy ID từ params
  try {
      const deletedRecord = await delRecordService('Car', id); // Gọi hàm xóa
      if (!deletedRecord) {
          return res.status(404).json({ message: `Không tìm thấy xe với ID ${id}` });
      }
      return res.status(200).json({ message: "Xe đã được xóa thành công", deletedRecord });
  } catch (error) {
      return res.status(500).json({ message: error.message });
  }
});

carRouter.post('/', async (req, res) => {
    try {
        const newCar = req.body; // Dữ liệu từ form được gửi lên từ client
        const result = await addDataService('Car', newCar);
        
        if (result) {
            return res.status(201).json({ message: 'Dữ liệu được thêm thành công', data: result });
        } else {
            return res.status(500).json({ message: 'Thêm dữ liệu thất bại' });
        }
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
});
export default carRouter;
