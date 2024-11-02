import carVersion from "../Models/CarVersion.js";

export const getCarVers = async(req,res)=>{
    try {
        const car_vers = await carVersion.find();
        const filteredCarVers = car_vers.map(carver => {
            const carverObject = carver.toObject();
            for (const key in carverObject) {
                if (carverObject[key] === 0) {
                    delete carverObject[key];
                }
            }
            return carverObject;
        });

        res.status(200).json(filteredCarVers);
    } catch (error) {
        res.status(500).json({message: 'export error'})
    }
}