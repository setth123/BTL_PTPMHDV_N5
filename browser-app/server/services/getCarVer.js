import carVersion from "../models/CarVersion.js";

export const getCarVers = async (carID) => {
    try {
        const carVers = await carVersion.find({ carID: carID })
        return carVers
    } catch (error) {
        console.log(err.message);
        return null;
    }
}