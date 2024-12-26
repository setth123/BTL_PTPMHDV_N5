import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "./CarDisplay.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const CarDisplay = () => {
  const [cars, setCars] = useState([]);
  const [articles, setArticles] = useState([
    {
      title: "Đánh giá VF 3 sau 5 tháng sử dụng",
      url: "https://vnexpress.net/danh-gia-vf-3-sau-5-thang-su-dung-4831472.html",
      image: "https://cdnphoto.dantri.com.vn/HFCC9B2dIvRW7n7NCJzJ4sX4wWY=/thumb_w/1020/2024/05/13/vinfast-vf-3-moi-nhan-coc-cong-dong-da-dang-anh-do-che-anh2-1715576144723.jpg",
    },
    {
      title: "VinFast thúc đẩy đào tạo nhân lực cho ngành công nghiệp",
      url: "https://vnexpress.net/vinfast-thuc-day-dao-tao-nhan-luc-cho-nganh-cong-nghiep-4831614.html",
      image: "https://cdn.tuoitrethudo.vn/stores/news_dataimages/2024/122024/24/17/a120241224175126.jpg?rt=20241224175134",
    },
    {
      title: "VinFast miễn phí sạc ôtô điện đến giữa năm 2027",
      url: "https://vnexpress.net/vinfast-mien-phi-sac-oto-dien-den-giua-nam-2027-4831371.html",
      image: "https://i1-vnexpress.vnecdn.net/2024/12/24/A1-1735010952-8040-1735011058.jpg?w=1020&h=0&q=100&dpr=1&fit=crop&s=XLAKmtQn1iSUkakEN-AK_A",
    },
    {
      title: "Ông Phạm Nhật Vượng dùng dịch vụ taxi bằng VinFast VF 8",
      url: "https://vnexpress.net/ong-pham-nhat-vuong-dung-dich-vu-taxi-bang-vinfast-vf-8-4829548.html",
      image: "https://i1-vnexpress.vnecdn.net/2024/12/19/z6144319723383-917cf69ea2425ec-2723-4795-1734575049.jpg?w=1020&h=0&q=100&dpr=1&fit=crop&s=XQCRQRTQjhVCSeUhFJDZKg",
    },
  ]);

  useEffect(() => {
    fetch("http://localhost:4000/chart/car")
    fetch("http://localhost:4000/carChart/cars")
      .then((response) => response.json())
      .then((data) => setCars(data))
      .catch((error) => console.error("Error fetching data: ", error));
  }, []);

  // Cấu hình slider với nút tùy chỉnh
  const settings = {
    dots: true, // Hiển thị nút điều hướng dots
    infinite: true, // Vòng lặp slider
    speed: 500,
    slidesToShow: 3, // Hiển thị 3 xe cùng lúc
    slidesToScroll: 1, // Lướt qua 1 slide mỗi lần
    nextArrow: <NextArrow />, // Nút sang phải
    prevArrow: <PrevArrow />, // Nút sang trái
    responsive: [
      {
        breakpoint: 768, // Màn hình nhỏ
        settings: {
          slidesToShow: 1,
        },
      },
      {
        breakpoint: 1024, // Màn hình trung bình
        settings: {
          slidesToShow: 2,
        },
      },
    ],
  };

  return (
    <div className="car-display-container">
    
      <Slider {...settings}>
        {cars.map((car, index) => (
          <div key={car._id} className="car-item">
            <div className="car-overlay">
              <img src={car.pictureURL} alt={car.name} className="car-image" />
              <div className="car-name-overlay">{car.name}</div>
            </div>
          </div>
        ))}
      </Slider>
      <div className="large-image-container">
        <img src="https://cmu-cdn.vinfast.vn/2024/04/232a2ae2-cayxanhtrentungcayso-scaled.jpg" alt="Large Display" className="large-image" />
      </div>
      <h2 className="articles-title">Tin Tức Nổi Bật</h2>
      <div className="articles-container">
        {articles.map((article, index) => (
          <div key={index} className="article-item">
            <img src={article.image} alt={article.title} className="article-image" />
            <h3 className="article-title">{article.title}</h3>
            <a href={article.url} target="_blank" rel="noopener noreferrer" className="article-link">Xem chi tiết</a>
          </div>
        ))}
      </div>
    </div>
  );
};

// Nút sang phải
const NextArrow = ({ onClick }) => {
  return <div className="slider-arrow next" onClick={onClick}>→</div>;
};

// Nút sang trái
const PrevArrow = ({ onClick }) => {
  return <div className="slider-arrow prev" onClick={onClick}>←</div>;
};

export default CarDisplay;
