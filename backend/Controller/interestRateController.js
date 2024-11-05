import InterestRate from "../Models/InterestRate.js";


export const getInterestRatebyID = async(req,res)=>{
  try {
      const rate = await InterestRate.findById(req.params.id);
      if(rate == null) res.status(404).json({message: 'Nothing is found'});
      res.status(200).json(rate);
  } catch (error) {
      res.status(500).json({message: error.message});
  }
}

export const getInterestRates = async(req,res)=>{
    try {
        const rates = await InterestRate.aggregate([
            {
                $match: {
                  $expr: {
                    $and: [
                      { $ne: ["$MaxPercent", 0] },
                      { $ne: ["$MaxTerm", 0] },
                      { $ne: ["$Rate", 0] },
                    ],
                  },
                },
              },
        ]);
        res.status(200).json(rates);
    } catch (error) {
        res.status(500).json({message: error.message});
        
    }
}