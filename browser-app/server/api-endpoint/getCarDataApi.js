import express from "express"
import {getCars, getCarType } from "../services/getCarData.js";
import { fetchCar } from "../services/fetchData.js";
const carDtRouter=express.Router();


carDtRouter.get("/car",async(req,res)=>{
    try{
        const data=await fetchCar();
        res.status(200).json(data);
    }
    catch(err){
        res.status(500).json(err.message)
    }
})

carDtRouter.get("/cars",async(req,res)=>{
    try{
        const data=await getCarType();
        res.status(200).json(data);
    }
    catch(err){
        res.status(500).json(err.message)
    }
})

carDtRouter.get("/:carId/:field",async(req,res)=>{
    const {carId,field}=req.params;
    try{
        let data;
        if(carId=='*'){
            data=await getCars(carId,field);
        }
        else data=await getCars(carId,field);
        res.status(200).json(data)
    }
    catch(err){
        res.status(500).json(err.message)
    }
})
export default carDtRouter;