import express from "express"
import { getCarVer } from "../Controller/carVerByIdController.js"

const carVerByIdRouter = express.Router();
carVerByIdRouter.get('/carver/:id', getCarVer)
export default carVerByIdRouter