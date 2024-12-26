import express from "express";
import { filterBank } from "../services/filterBankData.js";

const filterBankRoute = express.Router();

filterBankRoute.post('/', async(req, res)=>{
    try {
        const {loanYear, interestRate} = req.body;
        const listBank = await filterBank(loanYear, interestRate);
        console.log(listBank);
        return res.status(200).json({
            success: true,
            data: listBank
        });
    } catch (error) {
        console.error("Error filtering banks:", error);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: error.message,
        });
    }
})
export default filterBankRoute