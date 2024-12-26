import mongoose from "mongoose";

const CarSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    pictureURL:{
        type:String,
    }
})
const Car=mongoose.model('Car',CarSchema);
export default Car;