import Car from "../Models/Car.js";

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
        res.status(500).json({message: 'export error'});
    }
}