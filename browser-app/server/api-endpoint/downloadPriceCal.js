import express from 'express';
import downloadService from '../services/downloadService.js';

const router = express.Router();

router.post('/downloadPriceCal', (req, res) => {
    const data = req.body; // Nhận dữ liệu từ frontend

    // Kiểm tra dữ liệu nhận được
    if (!data || data.length === 0) {
        return res.status(400).json({ message: 'Dữ liệu không hợp lệ.' });
    }

    // Tạo file Excel
    const excelBuffer = downloadService.createExcelFile(data);

    // Cài đặt tiêu đề cho phản hồi
    res.setHeader('Content-Disposition', 'attachment; filename=installment_schedule.xlsx');
    res.setHeader('Content-Type', 'application/octet-stream');

    // Gửi buffer về phía frontend
    res.send(excelBuffer);
});

export default router;