async function fetchCarData(url) {
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
const url = 'http://localhost:3000'
async function loadCars() {
    try {
        const cars = await fetchCarData(`${url}/car`);
        console.log('Received cars data:', cars);

        const tableBody = document.getElementById('car-table-body');
        tableBody.innerHTML = ''; // Clear existing content

        cars.forEach((car, index) => {
            const row = document.createElement('tr');
            
            //Fixing
            row.setAttribute('data-car-id', car._id || ''); // Thêm custom attribute lưu ID xe
            row.setAttribute('data-table', 'Car');

            // Thêm sự kiện click cho hàng
            row.addEventListener('click', () => showCarDetails(`${car._id}`));
            const dataJson = JSON.stringify(car).replace(/"/g, '&quot;');
            row.innerHTML = `
                <td>${index + 1}</td>
                <td>${car._id || ''}</td>
                <td>${car.name || ''}</td>
                <td>${car.pictureURL ? `<img src="${car.pictureURL}" alt="${car.name}">` : 'No image'}</td>
                <td>
                    <button onclick="confirmDelete('${car._id}')" style="border: none; background: none; cursor: pointer;">
                        <ion-icon name="trash-outline" style="color: red; font-size: 20px;"></ion-icon>
                    </button>
                </td>
                <td>
                    <button onclick="OpenFormEditCar('${dataJson}',event,'edit-form-car')" style="border: none; background: none; cursor: pointer;">
                        <ion-icon name="create-outline" style="color: blue; font-size: 20px;"></ion-icon>
                    </button>
                </td>
            `;
            tableBody.appendChild(row);
        });
        // Hiển thị phần biểu đồ
        const chartContainer = document.getElementById('dashboard-header');
        chartContainer.style.display = 'flex'; // Hiển thị phần biểu đồ
    } catch (error) {
        console.error('Error loading cars:', error);
        const tableBody = document.getElementById('car-table-body');
        tableBody.innerHTML = '<tr><td colspan="4">Error loading data</td></tr>';
    }
}

async function showCarDetails(carId) {
    try {
        const response = await fetchCarData(`${url}/carVer`);
        console.log('Received cars data:', response);
        const cars = response;
        console.log(carId)
        

        // const idip = document.getElementById('car-id-input');
        // idip.value = carId;
        cars.forEach((car, index) => {
            console.log(`Car ${index + 1}:`);
            console.log('carID:', car.carID); // Kiểm tra giá trị của carID
        });
        
        // Filter car versions based on carId
        const carVersions = cars.filter(car => car.carID && car.carID.trim() === carId.trim());

        

        const modal = document.getElementById('car-details');
        let tableHTML = `
            <div class="modal-content">
                <button id="add-car-button" onclick="openAddModal('carVer')">Thêm</button>
                <span class="close-btn" onclick="closeModal()">&times;</span>
        `;
        tableHTML += `
            <input type="hidden" id="car-id-input" value="${carId}" />
        `;
        // Check if there are any car versions
        if (carVersions.length === 0) {
            // If no data, only show the "Add" button
            tableHTML += '<p></p>';
        } else {
            // If data exists, construct the dynamic table
            tableHTML += `
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
            `;
        }

        tableHTML += '</div>';

        modal.innerHTML = tableHTML;
        modal.style.display = 'block';
        document.getElementById('car-id-input').value = carId;
        checkCarIdInputExistence();

    } catch (error) {
        console.error('Error loading car details:', error);
        const modal = document.getElementById('car-details');
        modal.innerHTML = '<div class="modal-content">Error loading car details</div>';
        modal.style.display = 'block';
    }
}
function checkCarIdInputExistence() {
    // Kiểm tra sự tồn tại của phần tử có id 'car-id-input'
    const carIdInput = document.getElementById('car-id-input');
    
    // In ra thông tin phần tử
    if (carIdInput) {
        console.log('Element with id "car-id-input" exists:', carIdInput);
    } else {
        console.log('Element with id "car-id-input" does not exist');
    }
}
function showProductInfo(name, price, description) {
    document.getElementById('product-name').innerText = name;
    document.getElementById('product-price').innerText = price;
    document.getElementById('product-description').innerText = description;
    
    // Show modal
    document.getElementById('product-info-modal').style.display = 'flex';
}
  
// Function to close the modal
function closeModal() {
    const carModal = document.getElementById('car-details');
    const productModal = document.getElementById('product-info-modal');

    if (carModal) {
        carModal.style.display = 'none';
    }

    if (productModal) {
        productModal.style.display = 'none';
    }
}

// Close modal when clicking outside the content
window.onclick = function(event) {
    const carModal = document.getElementById('car-details');
    const productModal = document.getElementById('product-info-modal');
    if (event.target === carModal || event.target === productModal) {
        closeModal();
    }
}

