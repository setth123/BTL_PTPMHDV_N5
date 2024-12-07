import InterestRate from "../../Models/InterestRate.js";  // Đảm bảo import schema Rate đã định nghĩa

export const filterBank = async (loanYear, interestRate) => {
    try {
        const filters = {};

        // Lọc theo loanYear (MaxTerm)
        if (loanYear !== "all") {
            if (loanYear === "Dưới 5 năm") {
                filters.MaxTerm = { $lt: 5 };
            } else if (loanYear === "5-7 năm") {
                filters.MaxTerm = { $gte: 5, $lte: 7 };
            } else if (loanYear === "Trên 7 năm") {
                filters.MaxTerm = { $gt: 7 };
            }
        }

        // Lọc theo interestRate (Rate)
        if (interestRate !== "all") {
            if (interestRate === "Dưới 5%") {
                filters.Rate = { $lt: 5 };
            } else if (interestRate === "5-7%") {
                filters.Rate = { $gte: 5, $lte: 7 };
            } else if (interestRate === "Trên 7%") {
                filters.Rate = { $gt: 7 };
            }
        }

        const listBank = await InterestRate.find(filters);  // Truy vấn với các tiêu chí trong filters

        return listBank;  // Trả về danh sách ngân hàng phù hợp
    } catch (error) {
        console.error("Error filtering banks: ", error);
        throw error;
    }
};