const ctx1 = document.getElementById('chart1').getContext('2d');


// Dữ liệu biểu đồ 1: Phân bố loại xe
// Hàm lấy dữ liệu từ API và xử lý
async function fetchDataAndRenderChart() {
    try {
        // Gọi API
        const response = await fetch('http://localhost:3000/carVer');
        const cars = await response.json();

        // Đếm số lượng từng loại xe
        let gasolineCount = 0;
        let electricCount = 0;

        cars.forEach(car => {
            if (car.isBaterry === false) {
                gasolineCount++;
            } else {
                electricCount++;
            }
        });

        // Cập nhật dữ liệu vào biểu đồ
        const chart1 = new Chart(ctx1, {
            type: 'pie',
            data: {
                labels: ['Gasoline', 'Electric'],
                datasets: [{
                    label: 'Phân bố loại xe',
                    data: [gasolineCount, electricCount], // Dữ liệu từ API
                    backgroundColor: ['#FF6347', '#4682B4'],
                    borderColor: ['#FF6347', '#4682B4'],
                    borderWidth: 1
                }]
            }
        });
    } catch (error) {
        console.error('Lỗi khi lấy dữ liệu từ API:', error);
    }
}

// Gọi hàm để hiển thị biểu đồ
fetchDataAndRenderChart();

const ctx2 = document.getElementById('chart2').getContext('2d');

// Dữ liệu biểu đồ 2: Giá của các loại xe (Ví dụ)
// Hàm lấy dữ liệu từ API và hiển thị biểu đồ
async function fetchPriceDataAndRenderChart() {
    try {
        // Gọi API
        const response = await fetch('http://localhost:3000/carVer');
        const cars = await response.json();

        // Trích xuất thông tin cần thiết
        const labels = cars.map(car => car.verName); // Lấy tên các dòng xe
        const prices = cars.map(car => car.price); // Lấy giá xe

        // Hiển thị biểu đồ
        const chart2 = new Chart(ctx2, {
            type: 'bar',
            data: {
                labels: labels, // Tên dòng xe
                datasets: [{
                    label: 'Giá xe (Triệu VND)',
                    data: prices, // Giá xe từ API
                    backgroundColor: '#6fa3ef',
                    borderColor: '#6fa3ef',
                    borderWidth: 1
                }]
            }
        });
    } catch (error) {
        console.error('Lỗi khi lấy dữ liệu từ API:', error);
    }
}

// Gọi hàm để hiển thị biểu đồ
fetchPriceDataAndRenderChart();