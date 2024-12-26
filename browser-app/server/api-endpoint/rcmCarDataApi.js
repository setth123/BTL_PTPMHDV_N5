import express from "express";
import { getRecommendations } from "../services/recommendService.js";

const carRecommendRouter = express.Router();

// Endpoint để gợi ý xe dựa trên số tiền trả trước và số tiền trả hàng tháng
carRecommendRouter.post('/', async (req, res) => {
    try {
        const { downPayment, monthlyPayment } = req.body;

        // Kiểm tra tham số thiếu
        if (downPayment === undefined || monthlyPayment === undefined) {
            return res.status(400).json({
                success: false,
                message: "Thiếu tham số đầu vào",
                details: "Cần cung cấp cả 'downPayment' và 'monthlyPayment'"
            });
        }

        // Kiểm tra tham số âm
        if (downPayment < 0 || monthlyPayment < 0) {
            return res.status(400).json({
                success: false,
                message: "Dữ liệu đầu vào không hợp lệ",
                details: "Cả 'downPayment' và 'monthlyPayment' phải là số không âm"
            });
        }

        // Kiểm tra kiểu dữ liệu không hợp lệ
        if (typeof downPayment !== 'number' || typeof monthlyPayment !== 'number') {
            return res.status(400).json({
                success: false,
                message: "Dữ liệu đầu vào không hợp lệ",
                details: "Giá trị 'downPayment' và 'monthlyPayment' phải là số"
            });
        }

        // Xử lý logic gợi ý
        try {
            const recommendations = await getRecommendations(downPayment, monthlyPayment);

            // Kiểm tra nếu không tìm thấy gợi ý
            if (recommendations.length === 0) {
                return res.status(404).json({
                    success: false,
                    message: "Không tìm thấy gợi ý xe phù hợp",
                    details: { downPayment, monthlyPayment }
                });
            }

            // Trả về kết quả nếu có gợi ý
            return res.status(200).json({
                success: true,
                message: "Gợi ý xe thành công",
                data: recommendations
            });
        } catch (recommendationError) {
            console.error('Lỗi khi tạo gợi ý:', recommendationError);
            return res.status(500).json({
                success: false,
                message: "Không thể tạo gợi ý xe",
                details: recommendationError.message
            });
        }
    } catch (err) {
        console.error("Lỗi không mong muốn trong endpoint gợi ý xe:", err);
        return res.status(500).json({
            success: false,
            message: "Lỗi hệ thống",
            details: err.message
        });
    }
});

export default carRecommendRouter;
