const serverUrl = 'http://34.199.134.219/car';

async function fetchData(url) {
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

async function loadCars() {
    try {
        const cars = await fetchData(serverUrl);
        console.log('Received cars data:', cars);

        const tableBody = document.getElementById('car-table-body');
        tableBody.innerHTML = ''; // Clear existing content

        cars.forEach((car, index) => {
            const row = document.createElement('tr');
            
            //Fixing
            row.setAttribute('data-car-id', car._id || ''); // Thêm custom attribute lưu ID xe
            
            // Thêm sự kiện click cho hàng
            row.addEventListener('click', () => showCarDetails(`${car._id}`));
            
            row.innerHTML = `
                <td>${index + 1}</td>
                <td>${car._id || ''}</td>
                <td>${car.name || ''}</td>
                <td>${car.pictureURL ? `<img src="${car.pictureURL}" alt="${car.name}">` : 'No image'}</td>
            `;
            tableBody.appendChild(row);
        });
    } catch (error) {
        console.error('Error loading cars:', error);
        const tableBody = document.getElementById('car-table-body');
        tableBody.innerHTML = '<tr><td colspan="4">Error loading data</td></tr>';
    }
}
async function loadBanks() {
    try {
        const cars = await fetchData('http://34.199.134.219/rate'); // Fetch bank data
        console.log('Received bank data:', cars);

        const tableBody = document.getElementById('car-table-body');
        tableBody.innerHTML = ''; // Clear existing content

        cars.forEach((bank, index) => {
            const row = document.createElement('tr');
            row.setAttribute('data-bank-name', bank.BankName || ''); // Custom attribute to store bank name
            // You can add a click event if needed
            row.addEventListener('click', () => showBankDetails(`${bank.BankName}`)); // Function to show bank details
            row.innerHTML = `
                <td>${index + 1}</td>
                <td>${bank._id || ''}</td>
                <td>${bank.BankName || ''}</td>
                <td>${bank.MaxPercent || ''}</td>
                <td>${bank.MaxTerm || ''}</td>
                <td>${bank.Rate || ''}</td>
            `;
            tableBody.appendChild(row);
        });
    } catch (error) {
        console.error('Error loading bank data:', error);
        const tableBody = document.getElementById('car-table-body');
        tableBody.innerHTML = '<tr><td colspan="6">Error loading data</td></tr>';
    }
}

function loadTemplate(templateId) {
    const template = document.getElementById(templateId);
    const content = document.getElementById('content');
    content.innerHTML = template.innerHTML;
}

// Load data when the page is ready
document.addEventListener('DOMContentLoaded', function () {
    loadCars(); // Load car data if Dashboard is the default view
});

// async function showCarDetails(carId) {
//     try {
//         const response = await fetch(`http://34.199.134.219/backend/carver`);
//         if (!response.ok) {
//             throw new Error('Network response was not ok');
//         }
//         const cars = await response.json();

//         // Lọc các phiên bản của xe dựa trên carId
//         const carVersions = cars.filter(car => car.carID.trim() === carId.trim());
//         if (carVersions.length === 0) {
//             throw new Error('Car not found');
//         }

//         console.log('Car versions:', carVersions); // Thêm dòng này để kiểm tra dữ liệu

//         // Tạo container cho chi tiết các phiên bản xe
//         const detailsContainer = document.getElementById('car-details');
//         detailsContainer.innerHTML = ''; // Xóa chi tiết trước đó

//         // Lặp qua từng phiên bản và hiển thị chi tiết
//         carVersions.forEach(version => {
//             detailsContainer.innerHTML += `
//                 <div class="version-details">
//                     <h3 class="version-title">${version.verName} (${version.isBaterry ? 'Electric' : 'Gasoline'})</h3>
//                     <p><strong>Giá:</strong> <span class="price">${version.price} USD</span></p>
//                     <p><strong>Tốc độ tăng tốc:</strong> <span class="acceleration">${version.acceleration} giây</span></p>
//                     <p><strong>Dung lượng pin:</strong> <span class="battery">${version.battery || 'N/A'} kWh</span></p>
//                     <p><strong>Kích thước:</strong>
//                         Chiều cao: <span class="height">${version.height || 'N/A'} mm</span>, 
//                         Chiều dài: <span class="length">${version.length || 'N/A'} mm</span>, 
//                         Chiều rộng: <span class="width">${version.width || 'N/A'} mm</span>
//                     </p>
//                     <p><strong>Trọng lượng:</strong> <span class="weight">${version.weight || 'N/A'} kg</span></p>
//                     <p><strong>Số chỗ ngồi:</strong> <span class="seats">${version.seatsNumber || 'N/A'}</span></p>
//                     <p><strong>Cự ly:</strong> <span class="distance">${version.dist || 'N/A'} km</span></p>
//                     <p><strong>Công suất tối đa:</strong> <span class="max-power">${version.maxPower || 'N/A'} mã lực</span></p>
//                     ${version.pictureURL ? `<img class="version-image" src="${version.pictureURL}" alt="${version.verName}" />` : '<p>No image available</p>'}
//                     <hr>
//                 </div>
//             `;
//         });
//         const modal = document.getElementById('car-details');
//         modal.style.display = 'flex'; // Hiển thị modal
//     } catch (error) {
//         console.error('Error loading car details:', error);
//         const detailsContainer = document.getElementById('car-details');
//         detailsContainer.innerHTML = 'Error loading car details';
//     }
// }
async function showCarDetails(carId) {
    try {
        const response = await fetch(`http://34.199.134.219/carver/`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const cars = await response.json();

        // Lọc các phiên bản của xe dựa trên carId
        const carVersions = cars.filter(car => car.carID.trim() === carId.trim());
        if (carVersions.length === 0) {
            throw new Error('Car not found');
        }
        // Tạo bảng với các cột động
        let tableHTML = `
            <div class="modal-content">
                <span class="close-btn" onclick="closeModal()">&times;</span>
                <table>
                    <tr>
                        <td>Tên Phiên Bản</td>
                    
                        ${carVersions.map(version => `
                            <td>${version.verName} (${version.isBaterry ? 'Electric' : 'Gasoline'})</td>
                        `).join('')}
                    </tr>
                    <tr>
                        <td>Giá</td>
                        ${carVersions.map(version => `
                            <td data-price="${version.price}">${version.price} Triệu</td>
                        `).join('')}
                    </tr>
                    <tr>
                        <td>Tốc độ tăng tốc</td>
                        ${carVersions.map(version => `
                            <td>${version.acceleration} giây</td>
                        `).join('')}
                    </tr>
                    <tr>
                        <td>Dung lượng pin</td>
                        ${carVersions.map(version => `
                            <td>${version.battery || 'N/A'} kWh</td>
                        `).join('')}
                    </tr>
                    <tr>
                        <td>Kích thước</td>
                        ${carVersions.map(version => `
                            <td>
                                Chiều cao: ${version.height || 'N/A'} mm<br>
                                Chiều dài: ${version.length || 'N/A'} mm<br>
                                Chiều rộng: ${version.width || 'N/A'} mm
                            </td>
                        `).join('')}
                    </tr>
                    <tr>
                        <td>Trọng lượng</td>
                        ${carVersions.map(version => `
                            <td>${version.weight || 'N/A'} kg</td>
                        `).join('')}
                    </tr>
                    <tr>
                        <td>Số chỗ ngồi</td>
                        ${carVersions.map(version => `
                            <td>${version.seatsNumber || 'N/A'}</td>
                        `).join('')}
                    </tr>
                    <tr>
                        <td>Cự ly</td>
                        ${carVersions.map(version => `
                            <td>${version.dist || 'N/A'} km</td>
                        `).join('')}
                    </tr>
                    <tr>
                        <td>Công suất tối đa</td>
                        ${carVersions.map(version => `
                            <td>${version.maxPower || 'N/A'} mã lực</td>
                        `).join('')}
                    </tr>
                </table>
            </div>
        `;

        const modal = document.getElementById('car-details');
        modal.innerHTML = tableHTML;
        modal.style.display = 'block';
    } catch (error) {
        console.error('Error loading car details:', error);
        const modal = document.getElementById('car-details');
        modal.innerHTML = '<div class="modal-content">Error loading car details</div>';
        modal.style.display = 'block';
    }
}

function closeModal() {
    const modal = document.getElementById('car-details');
    modal.style.display = 'none';
}

let ascendingBank = true; // To track the sort order for Bank Name
let ascendingCar = true;  // To track the sort order for Car Name
function sortBankTable() {
    const tableBody = document.getElementById('car-table-body');
    const rows = Array.from(tableBody.getElementsByTagName('tr')); // Get rows as an array
    const bankSortIcon = document.getElementById('bank-sort-icon');

    // Sort rows based on the Bank Name (third column)
    rows.sort((a, b) => {
        const bankNameA = a.getElementsByTagName('td')[2].textContent.toLowerCase();
        const bankNameB = b.getElementsByTagName('td')[2].textContent.toLowerCase();

        if (bankNameA < bankNameB) {
            return ascendingBank ? -1 : 1;
        }
        if (bankNameA > bankNameB) {
            return ascendingBank ? 1 : -1;
        }
        return 0;
    });

    // Clear existing table body
    tableBody.innerHTML = '';

    // Append sorted rows back to the table
    rows.forEach(row => tableBody.appendChild(row));

    // Recalculate STT (serial number) based on the new order
    updateSerialNumbers(tableBody);

    // Toggle sorting order
    ascendingBank = !ascendingBank;

    // Update the sort icon based on the order
    bankSortIcon.innerHTML = ascendingBank ? '&#x21C5;' : '&#x21C7;'; // Up and down arrow icons
}
function sortBankTableRate() {
    const tableBody = document.getElementById('car-table-body');
    const rows = Array.from(tableBody.getElementsByTagName('tr'));
    const rateSortIcon = document.getElementById('rate-sort-icon');

    // Sort rows based on the Rate (assuming it's in column 4)
    rows.sort((a, b) => {
        // Get rate values and convert to numbers
        const rateA = parseFloat(a.getElementsByTagName('td')[5].textContent.replace('%', '').trim());
        const rateB = parseFloat(b.getElementsByTagName('td')[5].textContent.replace('%', '').trim());

        // Handle cases where rate might be invalid
        if (isNaN(rateA)) return 1;
        if (isNaN(rateB)) return -1;
        if (isNaN(rateA) && isNaN(rateB)) return 0;

        // Sort based on ascending/descending order
        return ascendingRate ? rateA - rateB : rateB - rateA;
    });

    // Clear existing table body
    tableBody.innerHTML = '';

    // Append sorted rows back to the table
    rows.forEach(row => tableBody.appendChild(row));

    // Recalculate serial numbers
    updateSerialNumbers(tableBody);

    // Toggle sorting order
    ascendingRate = !ascendingRate;

    // Update sort icon with more visible arrows
    rateSortIcon.innerHTML = ascendingRate ? '↑' : '↓';
}

// Helper function to update serial numbers
function updateSerialNumbers(tableBody) {
    const rows = tableBody.getElementsByTagName('tr');
    for (let i = 0; i < rows.length; i++) {
        const sttCell = rows[i].getElementsByTagName('td')[0];
        if (sttCell) {
            sttCell.textContent = i + 1;
        }
    }
}

// Initialize the sorting state
let ascendingRate = true;


function sortCarTable() {
    const tableBody = document.getElementById('car-table-body');
    const rows = Array.from(tableBody.getElementsByTagName('tr')); // Get rows as an array
    const carSortIcon = document.getElementById('car-sort-icon');

    // Sort rows based on the Car Name (fifth column)
    rows.sort((a, b) => {
        const carNameA = a.getElementsByTagName('td')[5].textContent.toLowerCase(); // Assuming the Car Name is in the 5th column
        const carNameB = b.getElementsByTagName('td')[5].textContent.toLowerCase();

        if (carNameA < carNameB) {
            return ascendingCar ? -1 : 1;
        }
        if (carNameA > carNameB) {
            return ascendingCar ? 1 : -1;
        }
        return 0;
    });

    // Clear existing table body
    tableBody.innerHTML = '';

    // Append sorted rows back to the table
    rows.forEach(row => tableBody.appendChild(row));

    // Recalculate STT (serial number) based on the new order
    updateSerialNumbers(tableBody);

    // Toggle sorting order
    ascendingCar = !ascendingCar;

    // Update the sort icon based on the order
    carSortIcon.innerHTML = ascendingCar ? '&#x21C5;' : '&#x21C7;'; // Up and down arrow icons
}

// Function to update serial numbers (STT)
function updateSerialNumbers(tableBody) {
    const rows = tableBody.getElementsByTagName('tr');
    for (let i = 0; i < rows.length; i++) {
        const sttCell = rows[i].getElementsByTagName('td')[0]; // STT is in the first column
        if (sttCell) {
            sttCell.textContent = i + 1; // Update STT with the new index
        }
    }
}
// Function to filter cars based on the input in the search box
function filterCarsAndBanks() {
    const searchBox = document.getElementById('search-box');
    const filter = searchBox.value.toLowerCase(); // Get the search term in lowercase
    const tableBody = document.getElementById('car-table-body');
    const rows = Array.from(tableBody.getElementsByTagName('tr')); // Get all rows

    // Show all rows or filter based on the search term
    rows.forEach(row => {
        const bankName = row.getElementsByTagName('td')[2].textContent.toLowerCase(); // Assuming Bank Name is in the 3rd column
        const carName = row.getElementsByTagName('td')[2].textContent.toLowerCase(); // Assuming Car Name is in the 5th column

        // Check if either the bank name or car name contains the search term
        if (bankName.includes(filter) || carName.includes(filter)) {
            row.style.display = ''; // Show the row if it matches
        } else {
            row.style.display = 'none'; // Hide the row if it doesn't match
        }
    });

    // Update the STT after filtering
    updateSerialNumbers(tableBody);
}

// Function to update serial numbers (STT)
function updateSerialNumbers(tableBody) {
    const rows = tableBody.getElementsByTagName('tr');
    let count = 1; // Initialize serial number
    for (let i = 0; i < rows.length; i++) {
        const sttCell = rows[i].getElementsByTagName('td')[0]; // STT is in the first column
        if (sttCell && rows[i].style.display !== 'none') { // Only update STT for visible rows
            sttCell.textContent = count++; // Update STT with the new index
        }
    }
}

