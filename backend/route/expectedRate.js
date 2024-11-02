import { getInterestRates } from "../Controller/interestRateController.js";
import express from "express";

const rateRouter = express.Router();
rateRouter.get('/interestrate',getInterestRates);

export default rateRouter;
