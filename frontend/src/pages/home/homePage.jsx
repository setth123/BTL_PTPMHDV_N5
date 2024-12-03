// src/pages/Homepage.js
import React from 'react';
import CarDisplay from '../../components/car3d/CarDisplay';
import './homePage.css';  // Tạo CSS riêng cho trang chủ

const Homepage = () => {
    return (
        <div className="homepage-container">
            <header className="homepage-header">
                <h1>Chào mừng đến với VinFast</h1>
                <p>Khám phá các mẫu xe VinFast mới nhất</p>
            </header>
            <main className="homepage-main">
                <CarDisplay /> {/* Component hiển thị danh sách xe */}
            </main>
        </div>
    );
};

export default Homepage;
