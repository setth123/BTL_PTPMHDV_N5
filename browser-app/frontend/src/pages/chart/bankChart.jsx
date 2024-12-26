import './chartPage.css';
import { useState } from 'react';
import SelectInput from '../../components/selectInput/selectInput';
import ChartComponent from '../../components/chart/chart';

const BankChart = () => {
    const [fieldOpt, setFieldOpt] = useState('');
    const [typeOpt, setTypeOpt] = useState('');
    const [colorsOpt, setColorsOpt] = useState('');

    const fieldName = [
        { name: 'Phần trăm tối đa', id: 'MaxPercent' },
        { name: 'Kỳ hạn tối đa', id: 'MaxTerm' },
        { name: 'Lãi suất', id: 'Rate' }
    ];
    const type = [
        { name: 'Biểu đồ cột', id: 'bar' },
        { name: 'Biểu đồ đường', id: 'line' },
        { name: 'Biểu đồ cột ngang', id: 'horizon' },
        { name: 'Biểu đồ radar', id: 'radar' }
    ];
    const colors = [
        { name: 'Đỏ', id: 'Red' },
        { name: 'Xanh dương', id: 'Blue' },
        { name: 'Xanh lá', id: 'Green' },
        { name: 'Vàng', id: 'Yellow' },
        { name: 'Cam', id: 'Orange' }
    ];

    const [data, setData] = useState([]);
    const [labels, setLabels] = useState([]);

    const handleSubmit = async () => {
        try {
            const res = await fetch(`http://localhost:4000/bankChart/${fieldOpt}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            });
            const dt = await res.json();
            setData(dt.map(item => item[fieldOpt]));
            setLabels(dt.map(item => item.BankName));
        } catch (err) {
            console.log('Error fetching carsversion data: ', err);
        }
    };

    return (
        <div className="chart-container">
            <div className="form-containerchart">
                <SelectInput data={fieldName} name={'Trường giá trị'} onChange={(value) => setFieldOpt(value)} />
                <SelectInput data={type} name={'Kiểu biểu đồ'} onChange={(value) => setTypeOpt(value)} />
                <SelectInput data={colors} name={'Màu sắc'} onChange={(value) => setColorsOpt(value)} />
                <button id="submitBtn" onClick={handleSubmit}>Tạo biểu đồ</button>
            </div>
            <ChartComponent data={data} labels={labels} backgroundColor={colorsOpt} title={`Ngân hàng`} type={typeOpt} />
        </div>
    );
};

export default BankChart;
