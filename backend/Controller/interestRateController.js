import InterestRate from "../Models/InterestRate.js";

export const getInterestRates = async(req,res)=>{
    try {
        const rates = await InterestRate.find();
        const filteredRateList = rates.filter(rate => Object.values(rate.toObject()).every(value => value !== 0));
        res.status(200).json(filteredRateList);
    } catch (error) {
        res.status(500).json({message: 'export error'});
    }
}