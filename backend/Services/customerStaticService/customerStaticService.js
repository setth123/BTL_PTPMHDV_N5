import CarVersion from '../../Models/CarVersion.js'
import InterestRate from '../../Models/InterestRate.js'
import Car from '../../Models/Car.js'

const customerStaticService = async () => {
    try {
        const topCars = await CarVersion.find({}).sort({ viewed: -1 }).limit(5);
        const topBanks = await InterestRate.find({}).sort({ viewed: -1 }).limit(5);
        const leastCar = await CarVersion.find({}).sort({ viewed: 1 }).limit(1);
        const leastBank = await InterestRate.find({}).sort({ viewed: 1 }).limit(1);

        const [carViewedSum, bankViewedSum,carVerViewedSum] = await Promise.all([
            CarVersion.aggregate([{ $group: { _id: null, total: { $sum: "$viewed" } } }]),
            InterestRate.aggregate([{ $group: { _id: null, total: { $sum: "$viewed" } } }]),
            Car.aggregate([{ $group: { _id: null, total: { $sum: "$viewed" } } }])
        ]);

        const viewedSum = (carViewedSum[0]?.total || 0) + (bankViewedSum[0]?.total || 0)+(carVerViewedSum[0]?.total||0);

        return {
            topCars,
            topBanks,
            leastCar,
            leastBank,
            viewedSum,
        };
    } catch (e) {
        console.log(e.message);
        return null;
    }
};

export default customerStaticService;
