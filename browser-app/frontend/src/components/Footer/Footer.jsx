import React from "react";
import "./Footer.css";
import '@fortawesome/fontawesome-free/css/all.min.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-logo">
        <img src="https://upload.wikimedia.org/wikipedia/commons/2/29/Logo_of_VinFast_%283D%29.svg"/>
        <p>CÔNG TY TNHH KINH DOANH THƯƠNG MẠI VÀ DỊCH VỤ VINFAST</p>
        <p>MST/MSDN: 0108926276 do Sở KHĐT TP Hà Nội cấp lần đầu ngày 01/10/2019 và các lần thay đổi tiếp theo.</p>
        <p>
          Địa chỉ trụ sở chính: Số 7, Đường Bằng Lăng 1, Khu đô thị Vinhomes Riverside, Phường Việt Hưng, Quận Long Biên,
          Thành phố Hà Nội, Việt Nam.
        </p>
      </div>
      <div className="footer-links">
        <ul>
          <li><a href="#">VỀ VINFAST</a></li>
          <li><a href="#">VỀ VINGROUP</a></li>
          <li><a href="#">TIN TỨC</a></li>
          <li><a href="#">ƯU ĐÃI</a></li>
          <li><a href="#">SHOWROOM VÀ ĐẠI LÝ</a></li>
          <li><a href="#">ĐIỀU KHOẢN CHÍNH SÁCH</a></li>
        </ul>
      </div>
      <div className="footer-contact">
        <p>HOTLINE: <a href="tel:1900232389">1900 23 23 89</a></p>
        <p>Email: <a href="mailto:support.vn@vinfastauto.com">support.vn@vinfastauto.com</a></p>
        <p>Kết nối với VinFast:</p>
        <div className="social-icons">
          <a href="#"><i className="fab fa-facebook"></i></a>
          <a href="#"><i className="fab fa-youtube"></i></a>
        </div>
      </div>
      <p className="footer-copyright">
        VinFast. All rights reserved. © Copyright
      </p>
    </footer>
  );
};

export default Footer;
