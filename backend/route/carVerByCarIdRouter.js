import { getCarVerByCarId } from "../Controller/carVerByCarIdController.js";
import express from "express"

const carVerByCarIdRouter = express.Router();
carVerByCarIdRouter.get('/carname/carvername', getCarVerByCarId)
export default carVerByCarIdRouter
