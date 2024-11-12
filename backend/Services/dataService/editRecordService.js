import mongoose from "mongoose";

const editRecordService = async(tableName,selectedId,newData)=>{
    try {
        // if (!selectedRecord || selectedRecord.length === 0) {
        //     console.log("Record not found.");
        //     return null;
        // }
        const updatedRecord = await mongoose.model(tableName).findByIdAndUpdate(selectedId, newData, { new: true });
        return updatedRecord;
    } catch (error) {
        console.log(err.message);
        return null;
    }
}
export default editRecordService;