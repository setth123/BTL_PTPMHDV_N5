import express from "express"
import { getCars } from "../Controller/carController.js"

const carRouter = express.Router();
carRouter.get('/car', getCars)
export default carRouter