import axios from "axios";

/**
 * Hàm lấy dữ liệu từ các API
 */
export const fetchData = async () => {
  try {
    const [carVersionsResponse, ratesResponse] = await Promise.all([
      axios.get("http://localhost:3000/carVer"),
      axios.get("http://localhost:3000/rate"),
    ]);

    const carVersions = carVersionsResponse.data;
    const rates = ratesResponse.data;

    return { carVersions, rates };
  } catch (error) {
    console.error("Lỗi khi lấy dữ liệu từ API:", error);
    throw new Error("Không thể lấy dữ liệu từ API");
  }
};

/**
 * Hàm gợi ý xe dựa trên thông tin tài chính
 */
export const getRecommendations = async (downPayment, monthlyPayment) => {
  const { carVersions, rates } = await fetchData();
  const recommendations = [];

  for (const carVersion of carVersions) {
    const carPrice = parseInt(carVersion.price);
    const loanAmount = carPrice - downPayment;

    if (loanAmount <= 0) {
      recommendations.push({
        carName: carVersion.name,
        price: carPrice,
        term: 0,
        monthlyPayment: 0,
      });
      continue;
    }

    const minRateBank = rates.reduce((lowest, bank) => {
      return (bank.Rate < lowest.Rate) ? bank : lowest;
    });

    const lowestInterestRate = minRateBank.Rate;
    const monthlyRate = lowestInterestRate / 100 / 12;

    for (let years = 1; years <= 8; years++) {
      const term = years * 12;
      const monthlyInstallment =
        loanAmount * (monthlyRate / (1 - Math.pow(1 + monthlyRate, -term)));

      if (monthlyInstallment <= monthlyPayment) {
        recommendations.push({
          carName: carVersion.name,
          price: carPrice,
          bankName: minRateBank.name,
          interestRate: lowestInterestRate,
          term: years,
          monthlyPayment: monthlyInstallment.toFixed(2),
        });
        break;
      }
    }
  }

  return recommendations;
};