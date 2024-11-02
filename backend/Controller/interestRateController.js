import InterestRate from "../Models/InterestRate.js";

export const getInterestRates = async(req,res)=>{
    try {
        const rates = await InterestRate.find();
        const filteredRates = rates.map(rate => {
            const rateObject = rate.toObject();
            for (const key in rateObject) {
                if (rateObject[key] === 0) {
                    delete rateObject[key];
                }
            }
            return rateObject;
        });

        res.status(200).json(filteredRates);
    } catch (error) {
        res.status(500).json({message: 'export error'});
    }
}