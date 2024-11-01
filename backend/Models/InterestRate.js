import mongoose from "mongoose";

const InterestRateSchema=new mongoose.Schema({
    BankName:{
        type:String,
        required:true,
    },
    Rate:{
        type:Number,
        required:true,
    },
    MaxPercent:{
        type:Number,
        required:true,
    },
    MaxTerm:{
        type:Number,
        required:true,
    },
    viewed:{
        type:Number,
    }
}, { timestamps: true })
const InterestRate=mongoose.model("InterestRate",InterestRateSchema);
export default InterestRate;