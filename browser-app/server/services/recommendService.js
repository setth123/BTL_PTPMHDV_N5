import { fetchCarData } from "./fetchData.js";
import { fetchRateData } from "./fetchData.js";
/**
 * Hàm gợi ý xe dựa trên thông tin tài chính
 * @param {number} downPayment - Số tiền trả trước
 * @param {number} monthlyPayment - Số tiền có thể trả mỗi tháng
 * @returns {Array} - Danh sách gợi ý xe
 */
export const getRecommendations = async (downPayment, monthlyPayment) => {
  try {
    const [carVersions, rates] = await Promise.all([fetchCarData(), fetchRateData()]);
    const recommendations = [];

    for (const carVersion of carVersions) {
      const carPrice = carVersion.price; // Giá xe
      const loanAmount = carPrice - downPayment; // Số tiền cần vay
      // Xác định loại xe (electric hoặc gasoline)
      const carType = carVersion.isBaterry ? "Electric" : "Gasoline";
      const carName = `${carVersion.verName} ${carType}`;
      if (loanAmount <= 0) {
        // Nếu không cần vay
        recommendations.push({
          carName: carVersion.verName,
          price: carPrice,
          term: "Không cần vay",
          monthlyPayment: "Không có",
          bankName: "Không có",
          interestRate: "Không có",
        });
        continue;
      }
      
      // Tìm ngân hàng có lãi suất thấp nhất
      const minRateBank = rates.reduce((lowest, bank) => {
        return bank.Rate < lowest.Rate ? bank : lowest;
      });

      const lowestInterestRate = minRateBank.Rate;
      const monthlyRate = lowestInterestRate / 100 / 12;

      for (let years = 1; years <= minRateBank.MaxTerm; years++) {
        const term = years * 12;
        const monthlyInstallment = loanAmount * (monthlyRate / (1 - Math.pow(1 + monthlyRate, -term)));

        if (monthlyInstallment <= monthlyPayment) {
          recommendations.push({
            carName,
            price: carPrice,
            bankName: minRateBank.BankName,
            interestRate: lowestInterestRate,
            term: years,
            monthlyPayment: monthlyInstallment.toFixed(2),
          });
          break;
        }
      }
    }

    return recommendations;
  } catch (error) {
    console.error("Error generating recommendations:", error);
    throw new Error("Không thể tạo danh sách gợi ý");
  }
};
