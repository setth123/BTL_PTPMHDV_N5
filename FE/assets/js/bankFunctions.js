async function fetchData(url, options = {}) {
    try {
        // const response = await fetch(url, options);
        const response = await fetch(url,{
            headers: {
                'Content-Type': 'application/json',
                "Authorization":`Bearer ${localStorage.getItem('adminToken')}`
              },
        });
        if (!response.ok) {
            throw new Error('Network response was not ok: ' + response.statusText);
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching data:', error);
        return [];
    }
}

const link = 'http://localhost:3000'
async function loadBanks() {
    try {
        const rates = await fetchData(`${link}/rate`); // Fetch bank data
        console.log('Received bank data:', rates);

        const tableBody = document.getElementById('car-table-body');
        tableBody.innerHTML = ''; // Clear existing content

        rates.forEach((bank, index) => {
            const row = document.createElement('tr');
            row.setAttribute('data-bank-id', bank._id || ''); // Custom attribute to store bank name
            row.setAttribute('data-table', 'Rate');
            // You can add a click event if needed
            row.addEventListener('click', () => showBankDetails(`${bank.BankName}`)); // Function to show bank details
            const bankJson = JSON.stringify(bank).replace(/"/g, '&quot;');
            row.innerHTML = `
                <td>${index + 1}</td>
                <td>${bank._id || ''}</td>
                <td>${bank.BankName || ''}</td>
                <td>${bank.MaxPercent || ''}</td>
                <td>${bank.MaxTerm || ''}</td>
                <td>${bank.Rate || ''}</td>
                <td>
                    <button onclick="confirmDeleteBank('${bank._id}')" style="border: none; background: none; cursor: pointer;">
                        <ion-icon name="trash-outline" style="color: red; font-size: 20px;"></ion-icon>
                    </button>
                </td>
                <td>
                    <button id="edit" onclick="OpenFormEditBank('${bankJson}',event,'edit-form-bank')" style="border: none; background: none; cursor: pointer;">
                        <ion-icon name="create-outline" style="color: blue; font-size: 20px;"></ion-icon>
                    </button>
                </td>
            `;
            tableBody.appendChild(row);
        });
        const chartContainer = document.getElementById('dashboard-header');
        chartContainer.style.display = 'none'; 
    } catch (error) {
        console.error('Error loading bank data:', error);
        const tableBody = document.getElementById('car-table-body');
        tableBody.innerHTML = '<tr><td colspan="6">Error loading data</td></tr>';
    }
}
async function searchBanks() {
    // Lấy giá trị từ dropdown
    const loanYear = document.getElementById('loanYear').value;
    const interestRate = document.getElementById('interestRate').value;

    // Tạo payload để gửi yêu cầu POST
    const payload = {
        loanYear: loanYear,
        interestRate: interestRate
    };

    try {
        // Gửi yêu cầu POST với payload
        const response = await fetchData(`${link}/filterBank`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload)
        });

        console.log('Received bank:', response);
        const rates = response.data; 
        console.log('Received bank array:', rates);
        // Cập nhật bảng với kết quả tìm kiếm
        const tableBody = document.getElementById('car-table-body');
        tableBody.innerHTML = ''; // Clear existing content

        rates.forEach((bank, index) => {
            const row = document.createElement('tr');
            row.setAttribute('data-bank-id', bank._id || ''); // Custom attribute to store bank name
            row.setAttribute('data-table', 'Rate');
            row.addEventListener('click', () => showBankDetails(`${bank.BankName}`)); // Function to show bank details
            const bankJson = JSON.stringify(bank).replace(/"/g, '&quot;');
            row.innerHTML = `
                <td>${index + 1}</td>
                <td>${bank._id || ''}</td>
                <td>${bank.BankName || ''}</td>
                <td>${bank.MaxPercent || ''}</td>
                <td>${bank.MaxTerm || ''}</td>
                <td>${bank.Rate || ''}</td>
                <td>
                    <button onclick="confirmDeleteBank('${bank._id}')" style="border: none; background: none; cursor: pointer;">
                        <ion-icon name="trash-outline" style="color: red; font-size: 20px;"></ion-icon>
                    </button>
                </td>
                <td>
                    <button id="edit" onclick="OpenFormEditBank('${bankJson}',event,'edit-form-bank')" style="border: none; background: none; cursor: pointer;">
                        <ion-icon name="create-outline" style="color: blue; font-size: 20px;"></ion-icon>
                    </button>
                </td>
            `;
            tableBody.appendChild(row);
        });
    } catch (error) {
        console.error('Error searching bank data:', error);
        const tableBody = document.getElementById('car-table-body');
        tableBody.innerHTML = '<tr><td colspan="6">Error loading data</td></tr>';
    }
}
