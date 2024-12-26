import React, { useEffect, useState } from 'react';
import SelectInput from '../../components/selectInput/selectInput';
import './chartPage.css';
import ChartComponent from '../../components/chart/chart';
const CarChart = () => {
  const [carOpt, setCarOpt] = useState(null);
  const [fieldOpt, setFieldOpt] = useState('');
  const [typeOpt, setTypeOpt] = useState('');
  const [colorsOpt, setColorsOpt] = useState('');
  const [cars, setCars] = useState({});

  useEffect(() => {
    const fetchCarsData = async () => {
      try {
        const res = await fetch('http://localhost:4000/carChart/cars', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        const carsData = await res.json();
        const newData = carsData.map((car) => ({ id: car._id, name: car.name }));
        setCars(newData);
        setCars((prevData) => [...prevData, { id: '*', name: '*' }]);
        console.log(cars);
      } catch (error) {
        console.error('Error fetching cars data:', error);
      }
    };
    fetchCarsData();
  }, []);

  const [data, setData] = useState([]);
  const [labels, setLabels] = useState([]);

  const handleSubmit = async () => {
    try {
      const res = await fetch(`http://localhost:4000/carChart/${carOpt}/${fieldOpt}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      });
      const dt = await res.json();
      setData(dt.map(item => item[fieldOpt]));
      setLabels(dt.map(item => item.verName));
    } catch (err) {
      console.log('Error fetching carsversion data: ', err);
    }
  };

  const fieldName = [
    { name: 'Giá', id: 'price' },
    { name: 'Thời gian tăng tốc', id: 'acceleration' },
    { name: 'Dung lượng pin', id: 'battery' },
    { name: 'Quãng đường chạy 1 lần sạc', id: 'dist' },
    { name: 'Chiều cao', id: 'height' },
    { name: 'Chiều dài', id: 'length' },
    { name: 'Công suất tối đa', id: 'maxPower' },
    { name: 'Số chỗ', id: 'seatsNumber' },
    { name: 'Trọng lượng', id: 'weight' },
    { name: 'Chiều rộng', id: 'width' },
  ];

  const type = [
    { name: 'Biểu đồ cột', id: 'bar' },
    { name: 'Biểu đồ đường', id: 'line' },
    { name: 'Biểu đồ cột ngang', id: 'horizon' },
    { name: 'Biểu đồ radar', id: 'radar' },
  ];

  const colors = [
    { name: 'Đỏ', id: 'Red' },
    { name: 'Xanh dương', id: 'Blue' },
    { name: 'Xanh lá', id: 'Green' },
    { name: 'Vàng', id: 'Yellow' },
    { name: 'Cam', id: 'Orange' },
  ];

  return (
    <div className="chart-container">
      <div className='form-containerchart'>
        <SelectInput data={cars} name={'Mẫu xe'} onChange={(value) => setCarOpt(value)} isRanked />
        <SelectInput data={fieldName} name={'Trường giá trị'} onChange={(value) => setFieldOpt(value)} />
        <SelectInput data={type} name={'Kiểu biểu đồ'} onChange={(value) => setTypeOpt(value)} />
        <SelectInput data={colors} name={'Màu sắc'} onChange={(value) => setColorsOpt(value)} />
        <button id="submitBtn" onClick={handleSubmit}>
          Tạo biểu đồ
        </button>
      </div>
      <ChartComponent data={data} labels={labels} backgroundColor={colorsOpt} title={`Xe`} type={typeOpt} />
    </div>
  );
};

export default CarChart;