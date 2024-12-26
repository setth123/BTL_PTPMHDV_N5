import mongoose from "mongoose";

const CarSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    pictureURL:{
        type:String,
    },
    viewed:{
        type:Number,
        default:0,
    }
})
const Car=mongoose.model('Car',CarSchema);
export default Car;