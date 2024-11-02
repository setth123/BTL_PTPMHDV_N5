import Car from "../Models/Car.js";

export const getCar = async(req,res)=>{
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
        res.status(500).json({message: 'export error'});
    }
}