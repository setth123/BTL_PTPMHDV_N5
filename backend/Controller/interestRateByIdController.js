import InterestRate from "../Models/InterestRate.js";

export const getInterestRate = async(req,res)=>{
    try {
        const rate = await InterestRate.findById(req.params.id);
        if(rate == null) res.status(404).json({message: 'Nothing is found'});
        res.status(200).json(rateObject);
    } catch (error) {
        res.status(500).json({message: 'export error'});
    }
}