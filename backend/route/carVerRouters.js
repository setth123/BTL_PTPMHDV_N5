import express from "express"
import { getCarVerbyID, getCarVers } from "../Controller/carVerController.js"

const carVerRouters = express.Router();
carVerRouters.get('/',getCarVers);
carVerRouters.get('/:id',getCarVerbyID);
export default carVerRouters