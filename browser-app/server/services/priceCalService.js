import carVersion from "../models/CarVersion.js";
import InterestRate from "../models/InterestRate.js";
import Car from "../models/Car.js";

export const getPriceCal = async(carId, carVerId, bankId, downPayRate, loanTerm)=>{
    try {
        const updateCar=await Car.findOneAndUpdate(
            {_id:carId},
            {$inc:{'viewed':1}},
            {new:true}
        )

        const updateVer=await carVersion.findOneAndUpdate(
            {_id:carVerId},
            {$inc:{'viewed':1}},
            {new:true}
        )
        const updateBank=await InterestRate.findOneAndUpdate(
            {_id:bankId},
            {$inc:{'viewed':1}},
            {new:true}
        )
        const car = await carVersion.findOne({ _id: carVerId }).select('price');
        const bank = await InterestRate.findOne({_id: bankId}).select('Rate');

        const price = car.price*1000000;
        const rate = bank.Rate;

        const downPayment = (downPayRate / 100) * price; // Số tiền trả trước
        const loanAmount = price - downPayment;          // Số tiền vay
        const monthlyRate = rate / 12 / 100;       // Lãi suất hàng tháng
        const totalMonths = loanTerm * 12;              // Tổng số tháng vay

        let schedule = [];
        let remainingBalance = loanAmount;

        for (let month = 1; month <= totalMonths; month++) {
            const interestPayment = remainingBalance * monthlyRate; // Tiền trả lãi mỗi tháng
            const principalPayment = loanAmount / totalMonths;      // Tiền trả gốc mỗi tháng
            const totalPayment = interestPayment + principalPayment; // Tổng tiền trả mỗi tháng
            const endingBalance = remainingBalance - principalPayment; // Số dư cuối kỳ
        
            schedule.push({
                paymentPeriod: `Tháng ${month}`,
                startingBalance: Math.round(remainingBalance),  // Làm tròn thành số nguyên
                principalPayment: Math.round(principalPayment), // Làm tròn thành số nguyên
                interestPayment: Math.round(interestPayment),   // Làm tròn thành số nguyên
                totalPayment: Math.round(totalPayment),         // Làm tròn thành số nguyên
                endingBalance: Math.round(endingBalance),       // Làm tròn thành số nguyên
            });
        
            remainingBalance = endingBalance;
        }
        

        // Trả về kết quả
        return {
            carVerId,
            bankId,
            price,
            downPayment,
            loanAmount,
            schedule,
        };
    } catch (error) {
        console.log(err.message);
        return null;
    }
}