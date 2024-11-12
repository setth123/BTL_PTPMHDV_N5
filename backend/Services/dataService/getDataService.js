import mongoose from "mongoose"
const getDataService=async(tableName,condition={})=>{
    try{
        const Model=mongoose.model(tableName);
        const data=await Model.find(condition);
        return data;    
    }
    catch(err){
        console.log(err.message);
        return null;
    }
}
export default getDataService;