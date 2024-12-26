import { fetchRateData } from "./fetchData.js";

export const filterBank = async (loanYear, interestRate) =>{
    try{
        const rates = await fetchRateData(); //tại sao ko cần promiss all
        const filter = [];

        for (const rate of rates){
            let match = true; //nói kĩ hơn về logic của match

            if (loanYear !== "all"){
                if (loanYear === "Dưới 5 năm"){
                    match = match && rate.MaxTerm < 5;
                }
                else if (loanYear === "5-7 năm"){
                    match = match && rate.MaxTerm >=5 && rate.MaxTerm <= 7;
                }
                else if (loanYear === "Trên 7 năm"){
                    match = match && rate.MaxTerm > 7;
                }
            }
            if (interestRate !== "all"){
                if (interestRate === "Dưới 5%"){
                    match = match && rate.Rate <5;
                }
                else if (interestRate === "5-7%"){
                    match = match && rate.Rate <= 5 && rate.Rate <=7;
                }
                else if (interestRate === "Trên 7%"){
                    match = match && rate.Rate > 7;
                }
            }
            if (match){
                filter.push(rate);
            }
        }
        return filter;
    }catch(error){
        console.error("Error filtering banks: ", error);
        throw error;
    }
}