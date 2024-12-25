import mongoose from "mongoose";

const delRecordService = async (tableName, selectedId) => {
    try {
        const deletedRecord = await mongoose.model(tableName).findByIdAndDelete(selectedId);

        if (!deletedRecord) {
            console.log(`No record found with ID: ${selectedId}`);
            return null; // Trả về null nếu không tìm thấy bản ghi để xóa
        }

        return deletedRecord; // Trả về bản ghi đã xóa
    } catch (error) {
        console.error("Error deleting record:", error.message);
        return null; // Trả về null nếu có lỗi
    }
}

export default delRecordService;
