import express from "express"
import { getInterestRate } from "../Controller/interestRateByIdController.js";

const interestRateByIdRouter = express.Router();
interestRateByIdRouter.get('/interestrate/:id', getInterestRate)
export default interestRateByIdRouter