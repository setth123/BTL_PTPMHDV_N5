import express from "express"
import { getCarVerByCarId, getCarbyID, getCars } from "../Controller/carController.js";

const carsRouters = express.Router();
carsRouters.get('/:id',getCarbyID);
carsRouters.get('/',getCars);
carsRouters.get('/:id/carVer',getCarVerByCarId);
export default carsRouters