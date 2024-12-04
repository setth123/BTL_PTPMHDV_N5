import express from "express";
import {getRecommendations} from "../services/recommendService.js"; // Đảm bảo rằng bạn đang import đúng

const carRecommendRouter = express.Router();

// Endpoint để gợi ý xe dựa trên số tiền trả trước và số tiền trả hàng tháng
carRecommendRouter.post('/', async (req, res) => {
    try {
        const { downPayment, monthlyPayment } = req.body; // Dữ liệu từ form được gửi lên từ client

        // Kiểm tra dữ liệu đầu vào
        if (typeof downPayment !== 'number' || typeof monthlyPayment !== 'number') {
            return res.status(400).json({ error: "Số tiền trả trước và số tiền trả hàng tháng phải là số hợp lệ." });
        }

        // Gọi hàm getRecommendations để lấy danh sách gợi ý
        const recommendations = await getRecommendations(downPayment, monthlyPayment);
        
        // Kiểm tra nếu có gợi ý xe
        if (recommendations.length === 0) {
            return res.status(404).json({ message: "Không tìm thấy xe phù hợp với tài chính của bạn." });
        }

        // Trả về danh sách gợi ý xe
        return res.status(201).json({
            message: 'Dữ liệu gợi ý xe đã được tìm thấy thành công.',
            data: recommendations
        });

    } catch (err) {
        console.error("Lỗi khi lấy gợi ý xe:", err);
        return res.status(500).json({ message: err.message });
    }
});

export default carRecommendRouter;
