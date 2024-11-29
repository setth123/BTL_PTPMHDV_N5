async function fetchCharData(url) {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Network response was not ok: ' + response.statusText);
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching data:', error);
        return [];
    }
}

async function creatChart(){
    fetchCharData('http://localhost:3000/rate')
    .then(data => {
        // Lọc dữ liệu để lấy tên ngân hàng và lãi suất
        const banks = data.map(item => item.BankName); // Xác định các ngân hàng trên trục x
        const rates = data.map(item => item.Rate); // Lãi suất cho trục y

        // Tạo biểu đồ đường cong (spline chart)
        const ctx = document.getElementById('interestRateChart').getContext('2d');
        new Chart(ctx, {
            type: 'line', // Biểu đồ đường cong
            data: {
                labels: banks, // Tên ngân hàng cho trục x
                datasets: [{
                    label: 'Interest Rate (%)',
                    data: rates, // Lãi suất trên trục y
                    borderColor: 'rgba(75, 192, 192, 1)',
                    backgroundColor: 'rgba(75, 192, 192, 0.2)',
                    borderWidth: 2,
                    tension: 0.4 // Làm mượt các đường nối để tạo đường cong
                }]
            },
            options: {
                responsive: true,
                scales: {
                    y: {
                        beginAtZero: true,
                        title: {
                            display: true,
                            text: 'Interest Rate (%)'
                        }
                    },
                    x: {
                        title: {
                            display: true,
                            text: 'Bank Name'
                        }
                    }
                }
            }
        });
    })
    .catch(error => console.error('Error fetching the data:', error));

}