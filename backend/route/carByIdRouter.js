import express from "express"
import { getCar } from "../Controller/carByIdController.js"

const carByIdRouter = express.Router();
carByIdRouter.get('/car/:id', getCar)
export default carByIdRouter