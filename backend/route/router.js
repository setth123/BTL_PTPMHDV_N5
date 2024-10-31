import express, { Router } from "express"
import Car from "../Models/Car.js";
import carVersion from "../Models/CarVersion.js";
import InterestRate from "../Models/InterestRate.js";

const router = express.Router();
//Get list products
router.get('/car',async(req,res)=>{
    try {
        const cars = await Car.find();
        res.status(200).json(cars);
    } catch (error) {
        res.status(500).json({message: 'Server Error'});
    }
});
//Get product by id
router.get('/car/:id',async(req,res)=>{
    try {
        const car = await Car.findById(req.params.id);
        if(car == null) res.status(404).json({message: 'Nothing is found'});
        res.status(200).json(car);
    } catch (error) {
        res.status(500).json({message: 'Server error'});
    }
});
//get list car version
router.get('/carver', async(req,res)=>{
    try {
        const car_vers = await carVersion.find();
        res.status(200).json(car_vers);
    } catch (error) {
        res.status(500).json({message: 'error'})
    }
})
//get car version by id
router.get('/carver/:id', async(req,res)=>{
    try {
        const car_ver = await carVersion.findById(req.params.id);
        if(car_ver == null){
            res.status(404).json({message : 'Not found'});
        }
        res.status(200).json(car_ver);
    } catch (error) {
        res.status(500).json({message: 'Server error'});
    }
});
//get list interest rate 
router.get('/rate',async(req,res)=>{
    try {
        const rates = await InterestRate.find();
        res.status(200).json(rates);
    } catch (error) {
        res.status(500).json({message: 'Error'});
    }
});
//get interest rate by id
router.get('/rate/:id',async(req,res)=>{
    try {
        const rate = await InterestRate.findById(req.params.id);
        if(rate == null) res.status(404).json({message: 'Nothing is found'});
        res.status(200).json(rate);
    } catch (error) {
        res.status(500).json({message: 'Server error'});
    }
});
//get list car version from car name
router.get('/carname/carvername', async(req,res)=>{
    try {
        const allCars = await Car.find();
        const result = await Promise.all(allCars.map(async(car)=>{
            const allCarVersions = await carVersion.find({carID: car._id.toString()});
            return{
                name: car.name,
                versions: allCarVersions
            };
        }));    
        res.json(result);   
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

export default router;
