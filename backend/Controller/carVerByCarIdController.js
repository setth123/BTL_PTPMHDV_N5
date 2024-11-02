import Car from "../Models/Car.js";
import carVersion from "../Models/CarVersion.js";

export const getCarVerByCarId = async(req,res)=>{
    try {
        const allCars = await Car.find();
        const result = await Promise.all(allCars.map(async(car)=>{
            const allCarVersions = await carVersion.find({carID: car._id.toString()});
            const filteredVersions = allCarVersions.map((version) => {
                const filteredFields = {};
                Object.keys(version.toObject()).forEach((key) => {
                    if (version.get(key) !== 0) {
                        filteredFields[key] = version.get(key);
                    }
                });
                return filteredFields;
            });
            return {
                name: car.name,
                versions: filteredVersions
            };
        }));
        
        res.json(result);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'export error' });
    }
}