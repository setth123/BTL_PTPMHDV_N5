import React, { useState } from "react";
import "./CarRcm.css";

const CarRecommendation = () => {
  const [downPayment, setDownPayment] = useState("");
  const [monthlyPayment, setMonthlyPayment] = useState("");
  const [recommendedCars, setRecommendedCars] = useState([]);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:4000/recommendations", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          downPayment: parseInt(downPayment),
          monthlyPayment: parseInt(monthlyPayment),
        }),
      });

      if (!response.ok) {
        throw new Error("Không thể lấy dữ liệu từ server");
      }

      const data = await response.json();
      setRecommendedCars(data.data);
      setError('');
    } catch (err) {
      setError("Đã có lỗi xảy ra. Vui lòng thử lại.");
    }
  };

  return (
    <div className="car-recommendation-container">
      <h2>Gợi ý mẫu xe phù hợp với tài chính của bạn</h2>
      <form onSubmit={handleSubmit}>
        <div className="input-field">
          <label htmlFor="downPayment">Số tiền trả trước: </label>
          <input
            type="number"
            id="downPayment"
            value={downPayment}
            onChange={(e) => setDownPayment(e.target.value)}
            placeholder="Nhập số tiền trả trước"
          />
        </div>
        <div className="input-field">
          <label htmlFor="monthlyPayment">Số tiền có thể trả mỗi tháng:</label>
          <input
            type="number"
            id="monthlyPayment"
            value={monthlyPayment}
            onChange={(e) => setMonthlyPayment(e.target.value)}
            placeholder="Nhập số tiền trả mỗi tháng"
          />
        </div>
        <button type="submit" className="submit-button">Gửi</button>
        <p className="input-note">Chú ý: Nhập số 1 tương ứng 1 triệu, Nhập số 100 tương ứng 100 triệu</p>
      </form>

      {error && <p className="error">{error}</p>}

      {recommendedCars.length > 0 && !error && (
        <div className="car-suggestions">
          <h3 className="table-title">Các mẫu xe gợi ý:</h3>
          <table className="suggestion-table">
            <thead>
              <tr>
                <th>Tên xe</th>
                <th>Giá xe (Triệu VND)</th>
                <th>Ngân hàng</th>
                <th>Lãi suất (%)</th>
                <th>Thời hạn vay (Năm)</th>
                <th>Khoản trả hàng tháng (Triệu VND)</th>
              </tr>
            </thead>
            <tbody>
              {recommendedCars.map((car, index) => (
                <tr key={index}>
                  <td>{car.carName}</td>
                  <td>{car.price}</td>
                  <td>{car.bankName}</td>
                  <td>{car.interestRate}</td>
                  <td>{car.term}</td>
                  <td>{car.monthlyPayment}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}


    </div>
  );
};

export default CarRecommendation;
