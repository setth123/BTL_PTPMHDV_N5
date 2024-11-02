import carVersion from "../Models/CarVersion.js";

export const getCarVer = async(req,res)=>{
    try {
        const carver = await carVersion.findById(req.params.id);
        if(carver == null) res.status(404).json({message: 'Nothing is found'});
        
        const carverObject = carver.toObject();
        for (const key in carverObject) {
            if (carverObject[key] === 0) {
                delete carverObject[key];
            }
        }

        res.status(200).json(carverObject);
    } catch (error) {
        res.status(500).json({message: 'export error'});
    }
}