import { getInterestRatebyID, getInterestRates } from "../Controller/interestRateController.js"
import express from "express";

const rateRouter = express.Router();
rateRouter.get('/',getInterestRates);
rateRouter.get('/:id',getInterestRatebyID);
export default rateRouter;
