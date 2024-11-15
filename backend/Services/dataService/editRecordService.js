import mongoose from "mongoose";

const editRecordService = async(tableName,selectedId,newData)=>{
    try {
        const updatedRecord = await mongoose.model(tableName).findByIdAndUpdate(selectedId, newData, { new: true });
        console.log(updatedRecord);
        return updatedRecord;
    } catch (error) {
        console.log(error.message);
        return null;
    }
}
export default editRecordService;