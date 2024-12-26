const fetchCar = async () => {
    const select = document.getElementById('car1');
    select.innerHTML = ''; // Xóa các mục đã có
    const tableName = document.getElementById("tableName1").value;
    if (tableName === 'carVer') {
        // Nếu bảng chọn là "carVer", gọi API để lấy thông tin dòng xe
        const res = await fetch('http://localhost:3000/car/', {
            headers: { 'Authorization': `Bearer ${localStorage.getItem('adminToken')}` },
        });
        const cars = await res.json();
        const defaultOption = document.createElement('option');
        defaultOption.value = '';
        defaultOption.textContent = '*';
        select.appendChild(defaultOption);
        cars.forEach(item => {
            const option = document.createElement('option');
            option.value = item._id;
            option.textContent = item.name;
            select.appendChild(option);
        });
    }
};
// Lấy các trường dữ liệu (tùy theo bảng chọn)
const getField = () => {
    const tableName = document.getElementById("tableName1").value;
    const select = document.getElementById("field1");
    select.innerHTML = ''; // Xóa các mục đã có
    if (tableName === 'rate') {
        const opts = [
            { value: 'MaxPercent', name: 'Phần trăm tối đa' },
            { value: 'MaxTerm', name: 'Chu kỳ tối đa' },
            { value: 'Rate', name: 'Lãi suất' }
        ];
        opts.forEach(option => {
            const opt = document.createElement('option');
            opt.value = option.value;
            opt.textContent = option.name;
            select.appendChild(opt);
        });
    } else if (tableName === 'carVer') {
        const opts = [
            { value: 'price', name: "Giá" },
            { value: 'acceleration', name: "Thời gian tăng tốc lên 100KM" },
            { value: 'battery', name: "Dung lượng pin" },
            { value: 'dist', name: "Quãng đường tối đa một lần sạc" },
            { value: 'height', name: "Chiều cao" },
            { value: 'length', name: "Chiều dài" },
            { value: 'maxPower', name: "Công suất tối đa" },
            { value: 'seatsNumber', name: "Số ghế" },
            { value: 'weight', name: "Trọng lượng" },
            { value: 'width', name: "Chiều rộng" },
        ];
        opts.forEach(option => {
            const opt = document.createElement('option');
            opt.value = option.value;
            opt.textContent = option.name;
            select.appendChild(opt);
        });
    }
};
// Hàm này sẽ gọi lại khi thay đổi bảng (tableName)
const onTableChange = async () => {
    await fetchCar();
    getField();
};
let chart;
// Hàm vẽ biểu đồ
const drawChart = async () => {
    const tableName = document.getElementById('tableName1').value;
    const carID = document.getElementById('car1').value;
    let res;
    // Nếu không có dòng xe được chọn, lấy dữ liệu của toàn bộ bảng
    if (carID === "*" || carID === null || carID === "") {
        res = await fetch(`http://localhost:3000/${tableName}/`, {
            headers: { 'Authorization': `Bearer ${localStorage.getItem('adminToken')}` },
        });
    } else {
        // Nếu có dòng xe được chọn, lấy dữ liệu theo ID của dòng xe đó
        res = await fetch(`http://localhost:3000/${tableName}/Car/${carID}`, {
            headers: { 'Authorization': `Bearer ${localStorage.getItem('adminToken')}` },
        });
    }
    const data = await res.json();
    const field = document.getElementById('field1').value;
    const labels = data.map(item => item.BankName || item.verName); // Dựa trên bảng để lấy tên đúng
    const dataSet = data.map(item => item[field]);
    const ctx = document.getElementById('chart1').getContext('2d');
    if (chart) chart.destroy();
    chart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: field,
                data: dataSet,
                borderColor: 'rgba(75, 192, 192, 1)',
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderWidth: 2,
                tension: 0.4
            }]
        },
        options: {
            responsive: true,
            plugins: {
                title: {
                    display: true,
                    text: `Biểu đồ ${field} (${tableName})`,
                    font: {
                        size: 18,
                        weight: 'bold',
                    },
                    color: '#0d47a1'
                },
                legend: {
                    labels: {
                        color: '#0d47a1',
                        font: {
                            weight: 'bold'
                        }
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    title: { display: true, text: 'Giá trị', color: '#0d47a1', font: { weight: 'bold' } },
                    ticks: { color: '#0d47a1' }
                },
                x: {
                    title: { display: true, text: 'Tên ngân hàng hoặc dòng xe', color: '#0d47a1', font: { weight: 'bold' } },
                    ticks: { color: '#0d47a1' }
                }
            }
        }
    });
};
document.addEventListener('DOMContentLoaded', () => {
    onTableChange();
});