import express from "express"
import { getCarVers } from "../Controller/carVerController.js";

const carVerRouter = express.Router();
carVerRouter.get('/carver', getCarVers)
export default carVerRouter