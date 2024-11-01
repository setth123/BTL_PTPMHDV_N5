import mongoose from "mongoose";

const carVersionScema=new mongoose.Schema({
    verName:{
        type:String,
        require:true,
    },
    isBaterry:{
        type:Boolean,
        require:true,
    },
    price:{
        type:Number,
        require:true,
    },
    carID:{
        type:String,
        require:true,
    },
    length:{
        type:Number,
    },
    width:{
        type:Number,
    },
    height:{
        type:Number,
    },
    weight:{
        type:Number,
    },
    battery:{
        type:Number,
    },
    dist:{
        type:Number,
    },
    maxPower:{
        type:Number,
    },
    seatsNumber:{
        type:Number,
    },
    acceleration:{
        type:Number
    },
    viewed:{
        type:Number,
    }
})
const carVersion=mongoose.model('CarVersion',carVersionScema);
export default carVersion;