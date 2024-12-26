import mongoose from "mongoose";

const addDataService = async (tableName, data) => {
    try {
        const Model = mongoose.model(tableName);
        const newData = new Model(data);
        const savedData = await newData.save();
        return savedData;
    } catch (err) {
        console.log(err.message);
        return null;
    }
};

export default addDataService;