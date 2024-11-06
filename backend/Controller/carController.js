import Car from "../Models/Car.js";
import carVersion from "../Models/CarVersion.js";

export const getCars = async(req,res)=>{
    try {
        const cars = await Car.find();
        const filteredCars = cars.map(car => {
            const carObject = car.toObject();
            for (const key in carObject) {
                if (carObject[key] === 0) {
                    delete carObject[key];
                }
            }
            return carObject;
        });

        res.status(200).json(filteredCars);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

// get by id
export const getCarbyID = async(req,res)=>{
    try {
        const car = await Car.findById(req.params.id);
        if(car == null) res.status(404).json({message: 'Nothing is found'});
        
        const carObject = car.toObject();
        for (const key in carObject) {
            if (carObject[key] === 0) {
                delete carObject[key];
            }
        }

        res.status(200).json(carObject);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

//get carver by car name
export const getCarVerByCarId = async(req,res)=>{
    console.log("Test");
    try {
        const carVers=await carVersion.find({carID:req.params.id});
        res.status(200).json(carVers);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}