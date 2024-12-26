import carVersion from '../models/CarVersion.js';
import Car from '../models/Car.js';

// Lấy danh sách xe hoặc phiên bản xe
export const getCars = async (carID, field) => {
    try {
        // Danh sách các trường cần lấy, bao gồm field động và các trường mặc định
        const fields = [field, 'verName', 'pictureURL'];
        const fieldsObj = fields.reduce((acc, field) => {
            acc[field] = 1;
            return acc;
        }, {});

        if (carID === '*') {
            // Truy vấn tất cả CarVersion nếu carID là '*'
            const carData = await carVersion.find({}, fieldsObj);
            return carData;
        }

        // Truy vấn CarVersion với carID cụ thể
        const carData = await carVersion.find({ carID: carID }, fieldsObj);

        // Cập nhật số lượt xem (viewed) cho xe trong bảng Car
        const updateCar = await Car.findOneAndUpdate(
            { _id: carID },
            { $inc: { viewed: 1 } }, // Tăng số lượt xem
            { 
                new: true, 
                projection: fieldsObj // Bao gồm các trường cần lấy
            }
        );

        // Trả về dữ liệu từ CarVersion
        return carData;
    } catch (err) {
        console.log(err.message);
        return null;
    }
};

// Lấy danh sách loại xe, sắp xếp theo số lượt xem
export const getCarType = async () => {
    try {
        // Truy vấn danh sách xe từ bảng Car với các trường _id, name và pictureURL
        const carData = await Car.find({}, '_id name pictureURL')
            .sort({ viewed: -1 }); // Sắp xếp theo số lượt xem giảm dần
        return carData;
    } catch (err) {
        console.log(err.message);
        return null;
    }
};
