import React, { useEffect, useState } from 'react';
import './CarDisplay.css';

const CarDisplay = () => {
    const [cars, setCars] = useState([]);

    useEffect(() => {
        // Lấy dữ liệu từ API
        fetch('http://localhost:3000/car')
            .then(response => response.json())
            .then(data => setCars(data))
            .catch(error => console.error("Error fetching data: ", error));
    }, []);

    return (
        <div className="car-display-container">
            {cars.map((car) => (
                <div key={car._id} className="car-item">
                    <img src={car.pictureURL} alt={car.name} className="car-image" />
                    <p className="car-name">{car.name}</p>
                </div>
            ))}
        </div>
    );
};

export default CarDisplay;
