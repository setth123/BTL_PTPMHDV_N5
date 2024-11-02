import { getInterestRates } from "../Controller/interestRateController.js";
import express from "express";

const rateRouter = express.Router();
rateRouter.get('/rate',getInterestRates);

export default rateRouter;
