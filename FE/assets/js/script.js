const serverUrl = 'http://localhost:4000/car'; 

async function fetchData(url) {
    try {
        const response = await fetch(url,{
            headers: {
                Authorization: `Bearer ${localStorage.getItem('adminToken')}`,
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
            row.setAttribute('data-table', 'Car');
            
            // Thêm sự kiện click cho hàng
            row.addEventListener('click', () => showCarDetails(`${car._id}`));
            const dataJson = JSON.stringify(car).replace(/"/g, '&quot;');
            // Bang CAR
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
    } catch (error) {
        console.error('Error loading cars:', error);
        const tableBody = document.getElementById('car-table-body');
        tableBody.innerHTML = '<tr><td colspan="4">Error loading data</td></tr>';
    }
}
async function loadBanks() {
    try {
        const cars = await fetchData('http://localhost:4000/rate',{
            headers: {'Authorization': `Bearer ${localStorage.getItem('adminToken')}`},
        }); // Fetch bank data
        console.log('Received bank data:', cars);

        const tableBody = document.getElementById('car-table-body');
        tableBody.innerHTML = ''; // Clear existing content

        cars.forEach((bank, index) => {
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
    } catch (error) {
        console.error('Error loading bank data:', error);
        const tableBody = document.getElementById('car-table-body');s
        tableBody.innerHTML = '<tr><td colspan="6">Error loading data</td></tr>';
    }
}

async function confirmEditBank(formId, tablename) {
    const form = document.getElementById(formId);
    const inputs = form.querySelectorAll('input, select, textarea'); // Lấy tất cả các input, select và textarea trong form
    const editData = {};

    inputs.forEach(input => {
        // Đảm bảo rằng khi giá trị input thay đổi, giá trị sẽ được cập nhật trong editData
        input.addEventListener('input', () => {
            editData[input.name] = input.value;
        });
        
        // Lưu giá trị ban đầu khi hàm confirmEdit được gọi
        editData[input.name] = input.value;
    });
    let anythingId = null;
    const regex = /^.*Id$/;
    for (const key in form.dataset) {
        if (regex.test(key)&&key!=null) {
            anythingId = form.dataset[key];
            break; // Dừng lại sau khi tìm thấy thuộc tính đầu tiên kết thúc bằng '-id'
        }
    }
    console.log(anythingId);
    try {
        const response = await fetch(`http://localhost:4000/rate/editrate/${tablename}/${anythingId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('adminToken')}`,
            },
            body: JSON.stringify(editData),
        });

        if (!response.ok) {
            throw new Error('Network response was not ok: ' + response.statusText);
        }

        const result = await response.json();
        console.log('Edit successful:', result);
        await loadBanks();
        // Sau khi lưu thành công, đóng form chỉnh sửa và cập nhật dữ liệu hiển thị
        closeEditForm(formId);
         // Hoặc gọi lại hàm load dữ liệu tương ứng
         if(tablename == 'InterestRate') loadBanks();
    } catch (error) {
        console.error('Error editing car data:', error);
    }
}


document.getElementById('save-rate').addEventListener("click", function(){
    confirmEditBank('edit-form-bank','InterestRate');
});

async function confirmEdit(formId, tablename) {
    const form = document.getElementById(formId);
    const inputs = form.querySelectorAll('input, select, textarea'); // Lấy tất cả các input, select và textarea trong form
    const editData = {};

    // Lưu giá trị của các trường input vào đối tượng editData
    inputs.forEach(input => {
        editData[input.name] = input.value;
    });

    const carId = form.getAttribute('data-car-id'); // Lấy carId từ thuộc tính data-car-id của form

    try {
        // Sử dụng PUT thay vì POST
        const response = await fetch(`${serverUrl}/editcar/${tablename}/${carId}`, {
            method: 'PUT',  // Chuyển thành PUT thay vì POST
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('adminToken')}`,
            },
            body: JSON.stringify(editData),  // Gửi dữ liệu đã thay đổi
        });

        if (!response.ok) {
            throw new Error('Network response was not ok: ' + response.statusText);
        }

        const result = await response.json();
        console.log('Edit successful:', result);

        const row = document.querySelector(`tr[data-car-id="${carId}"]`);
        if (row) {
      // Cập nhật các ô trong dòng với dữ liệu mới
        row.getElementsByTagName('td')[2].textContent = editData.name;
        row.getElementsByTagName('td')[3].innerHTML = editData.pictureURL
            ? `<img src="${editData.pictureURL}" alt="${editData.name}">`
            : 'No image';
      // Cập nhật thêm các trường khác nếu cần
    }
        // Sau khi lưu thành công, đóng form chỉnh sửa và cập nhật dữ liệu hiển thị
        closeEditForm(formId);
        loadCars(); // Hoặc gọi lại hàm load dữ liệu tương ứng
    } catch (error) {
        console.error('Error editing car data:', error);
    }
}

// viet function sua xoa ở đây 
const formEditList = ["edit-form-car","edit-form-carver","edit-form-bank"]; /*Danh sách các form sửa*/
const modelList = ["car","carver","bank"];

function OpenFormEditCar(dataJson, e, formId) {
    e.stopPropagation();
  
    // Chuyển tham số về dạng chuẩn và xử lý lỗi
    let car;
    try {
        car = typeof dataJson === 'string' ? JSON.parse(dataJson) : dataJson;
    } catch (error) {
        console.error("Dữ liệu dataJson không hợp lệ", error);
        return;
    }
  
    // Lấy form được chọn
    const editForm = document.getElementById(formId);
    if (!editForm) {
        console.error("Không tìm thấy form với id: " + formId);
        return;
    }

    const row = e.target.closest('tr');
    if (!row) {
        console.error("Không tìm thấy dòng cha (tr) của sự kiện");
        return;
    }

    // Lấy giá trị của thuộc tính data-car-id hoặc data-bank-id
    const editId = row.getAttribute('data-car-id');
    if (!editId) {
        console.error("Không tìm thấy thuộc tính data-car-id hoặc data-bank-id trên dòng");
        return;
    }

    // Hiển thị form và gán giá trị mặc định
    editForm.style.display = 'block';
    activeOverlay();

    const formElements = editForm.querySelectorAll('input, select, textarea');
    if (formElements.length === 0) {
        console.warn("Không có trường nào trong form để gán giá trị");
    } else {
        formElements.forEach(element => {
            const fieldName = element.name;
            if (car.hasOwnProperty(fieldName) && car[fieldName] !== null && car[fieldName] !== undefined) {
                element.value = car[fieldName];
            } else {
                console.warn(`Không thể gán giá trị cho trường: ${fieldName}`);
            }
        });
    }

    // Gán giá trị editId vào thuộc tính data-car-id của form
    editForm.setAttribute('data-car-id', editId);
}

  
function OpenFormEditBank(dataJson, e, formId) {
    e.stopPropagation();
  
    // Chuyển tham số về dạng chuẩn và xử lý lỗi
    let car;
    try {
        car = typeof dataJson === 'string' ? JSON.parse(dataJson) : dataJson;
    } catch (error) {
        console.error("Dữ liệu dataJson không hợp lệ", error);
        return;
    }
  
    // Lấy form được chọn
    const editForm = document.getElementById(formId);
    if (!editForm) {
        console.error("Không tìm thấy form với id: " + formId);
        return;
    }

    const row = e.target.closest('tr');
    if (!row) {
        console.error("Không tìm thấy dòng cha (tr) của sự kiện");
        return;
    }

    // Lấy giá trị của thuộc tính data-car-id hoặc data-bank-id
    const editId = row.getAttribute('data-bank-id');
    if (!editId) {
        console.error("Không tìm thấy thuộc tính data-car-id hoặc data-bank-id trên dòng");
        return;
    }

    // Hiển thị form và gán giá trị mặc định
    editForm.style.display = 'block';
    activeOverlay();

    const formElements = editForm.querySelectorAll('input, select, textarea');
    if (formElements.length === 0) {
        console.warn("Không có trường nào trong form để gán giá trị");
    } else {
        formElements.forEach(element => {
            const fieldName = element.name;
            if (car.hasOwnProperty(fieldName) && car[fieldName] !== null && car[fieldName] !== undefined) {
                element.value = car[fieldName];
            } else {
                console.warn(`Không thể gán giá trị cho trường: ${fieldName}`);
            }
        });
    }

    // Gán giá trị editId vào thuộc tính data-car-id của form
    editForm.setAttribute('data-bank-id', editId);
}



function closeEditForm(formId){
  const closeBtn = document.getElementById(formId);
  closeBtn.style.display = 'none';
  closeOverlay();
}

function activeOverlay(){
  document.getElementById('overlay').style.display = 'block';
}
function closeOverlay(){
  document.getElementById('overlay').style.display = 'none';
}
document.getElementById('overlay').onclick = function(e) {
  formEditList.forEach(formEdit => {
    closeEditForm(formEdit);
    closeOverlay();
  });
  e.stopPropagation;
};

function loadTemplate(templateId) {
    const template = document.getElementById(templateId);
    const content = document.getElementById('content');
    content.innerHTML = template.innerHTML;
}

// Load data when the page is ready
document.addEventListener('DOMContentLoaded', function () {
    loadCars(); // Load car data if Dashboard is the default view
});


async function showCarDetails(carId) {
    try {
        const response = await fetch(`http://localhost:4000/carVer/Car/${carId}`, { 
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('adminToken')}`,
            },
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const carVersions = await response.json();

        if (!carVersions || carVersions.length === 0) {
            throw new Error('No versions found for this car');
        }

        // Tạo bảng với các hàng động và các phiên bản là các cột
        let tableHTML = `
            <div class="modal-content">
                <span class="close-btn" onclick="closeModal()">&times;</span>
                <table>                
                    <tbody>
                        <tr>
                        <td> Tên phiên bản</td> 
                            ${carVersions.map(version => `<td>${version.verName || 'Không có tên phiên bản'}</td>`).join('')}
                        </tr>
                        <tr>
                            <td>Pin</td>
                            ${carVersions.map(version => `<td>${version.isBaterry ? 'Kèm pin' : 'Không kèm pin'}</td>`).join('')}
                        </tr>
                        <tr>
                            <td>Giá</td>
                            ${carVersions.map(version => `<td data-price="${version.price}">${version.price} Triệu</td>`).join('')}
                        </tr>
                        <tr>
                            <td>Tốc độ tăng tốc</td>
                            ${carVersions.map(version => `<td>${version.acceleration} giây</td>`).join('')}
                        </tr>
                        <tr>
                            <td>Dung lượng pin</td>
                            ${carVersions.map(version => `<td>${version.battery || 'N/A'} kWh</td>`).join('')}
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
                            ${carVersions.map(version => `<td>${version.weight || 'N/A'} kg</td>`).join('')}
                        </tr>
                        <tr>
                            <td>Số chỗ ngồi</td>
                            ${carVersions.map(version => `<td>${version.seatsNumber || 'N/A'}</td>`).join('')}
                        </tr>
                        <tr>
                            <td>Cự ly</td>
                            ${carVersions.map(version => `<td>${version.dist || 'N/A'} km</td>`).join('')}
                        </tr>
                        <tr>
                            <td>Công suất tối đa</td>
                            ${carVersions.map(version => `<td>${version.maxPower || 'N/A'} mã lực</td>`).join('')}
                        </tr>
                        <tr>
                            <td>Xoá</td>
                            ${carVersions.map(version => `<td><button onclick="confirmDeleteVersion('${version._id}')" style="border: none; background: none; cursor: pointer;">
                                <ion-icon name="trash-outline" style="color: red; font-size: 20px;"></ion-icon>
                                </button>
                                </td>`).join('')}
                        </tr>
                        <tr>
                            <td>Sửa</td>
                            ${carVersions.map(version => `<td data-carver-id="${version._id}"><button onclick="const versionJSON = '${JSON.stringify(version).replace(/"/g, '&quot;')}'; OpenFormEditVersion(versionJSON,event)" style="border: none; background: none; cursor: pointer;">
                                    <ion-icon name="create-outline" style="color: blue; font-size: 20px;"></ion-icon>
                                </button>
                            </td>`).join('')}
                        </tr>
                    </tbody>
                </table>
            </div>
        `;

        // Hiển thị nội dung trong modal
        const modal = document.getElementById('car-details');
        modal.innerHTML = tableHTML;
        modal.style.display = 'flex'; 
    } catch (error) {
        console.error('Error loading car details:', error);
        const modal = document.getElementById('car-details');
        modal.innerHTML = '<div class="modal-content">Error loading car details</div>';
        modal.style.display = 'flex'; 
    }
}

async function OpenFormEditVersion(versionJson,e) {
    e.preventDefault();
    let version;
    try {
        version = typeof versionJson === 'string' ? JSON.parse(versionJson) : versionJson;
    } catch (error) {
        console.error("Dữ liệu dataJson không hợp lệ", error);
        return;
    }
    // Mở form chỉnh sửa
    const form = document.getElementById('edit-form-carver');
    form.style.display = 'block'; // Hoặc bất kỳ cách nào bạn muốn làm cho form hiển thị
    activeOverlay();

    // Lặp qua các trường input trong form và điền giá trị mặc định
    const inputs = form.querySelectorAll('input, select');
    inputs.forEach(input => {
        // Kiểm tra nếu trường input có name khớp với thuộc tính của phiên bản
        if (version.hasOwnProperty(input.name)) {
            input.value = version[input.name];  // Đặt giá trị của input từ version
            console.log(input.value);
        }
    });

    // const carSelect = form.querySelector('#car-select');
    // if (carSelect) {
    //     // Lấy danh sách các dòng xe từ bảng "Car" (carLines)
    //     const carLines = await fetchCarLines(); // Giả sử fetchCarLines là một hàm để lấy danh sách dòng xe
    //     //console.log("carLines");
    //     carLines.forEach(carLine => {
    //         console.log(typeof(carLine));
    //         const option = document.createElement('option');
    //         option.value = carLine.carId;
    //         option.textContent = carLine.name;
    //         if (carLine._id === version.carId) {
    //             option.selected = true; // Đặt giá trị mặc định của select là carId của version
    //         }
    //         carSelect.appendChild(option);
    //     });
    
    // Cập nhật thêm id của phiên bản vào form để có thể dễ dàng gửi cập nhật sau
    form.dataset.versionId = version._id; // Giả sử `version.id` là id của phiên bản
    console.log(version._id);    
}

async function fetchCarLines() {
    try {
        const response = await fetch('http://localhost:4000/car', {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('adminToken')}`,
            },
        }); // API lấy danh sách các dòng xe
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return await response.json();
    } catch (error) {
        console.error('Lỗi khi lấy danh sách dòng xe:', error);
        return [];
    }
}

async function confirmEditCarversion(formId) {
    const form = document.getElementById(formId);
    const inputs = form.querySelectorAll('input, select, textarea'); // Lấy tất cả các input, select và textarea trong form
    const editData = {};

    // Thu thập dữ liệu từ các trường input trong form
    inputs.forEach(input => {
        if(input.value==='True')editData[input.name]=true;
        else if(input.value==='False')editData[input.name]=false;
        else editData[input.name] = input.value;
    });

    // Lấy versionId từ thuộc tính data-version-id của form
    console.log(editData);
    const versionId = form.dataset.versionId;
    console.log(versionId);

    if (!versionId) {
        console.error("Không tìm thấy versionId trong form.");
        return;
    }

    try {
        // Gửi yêu cầu PUT để cập nhật phiên bản xe
        const response = await fetch(`http://localhost:4000/carVer/editcarver/CarVersion/${versionId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('adminToken')}`,
            },
            body: JSON.stringify(editData),
        });

        if (!response.ok) {
            throw new Error('Network response was not ok: ' + response.statusText);
        }

        const result = await response.json();
        console.log('Edit successful:', result);

        // Sau khi lưu thành công, đóng form chỉnh sửa và cập nhật dữ liệu hiển thị
        closeEditForm(formId);
        showCarDetails(result.carId); // Hiển thị lại thông tin chi tiết của xe chứa phiên bản
    } catch (error) {
        console.error('Error editing car version data:', error);
    }
}

document.getElementById('save-carver').addEventListener('click', function() {
    confirmEditCarversion('edit-form-carver');
});


function closeModal() {
    const modal = document.getElementById('car-details');
    modal.style.display = 'none';
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


// Hàm xóa car id
async function confirmDelete(carId) {
    console.log("Car ID received for deletion:", carId); // Log ID nhận được
    const userConfirmed = confirm("Bạn có chắc chắn muốn xóa xe này không?");
    if (userConfirmed) {
        try {
            const response = await fetch(`http://localhost:4000/car/${carId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem('adminToken')}`,
                }
            });
            const result = await response.json();

            console.log(response); // Log phản hồi từ server
            console.log(result); // Log kết quả JSON

            if (response.ok) {
                alert("Xe đã được xóa thành công");
                document.getElementById(`car-${carId}`).remove();
            } else {
                alert(`Lỗi khi xóa xe: ${result.message}`);
            }
        } catch (error) {
            console.error("Error deleting car:", error);
            //alert("Đã xảy ra lỗi khi xóa xe.");
        }
    }
}

// hàm xóa bank theo id 
async function confirmDeleteBank(bankID) {
    //console.log("Car ID received for deletion:", carId); // Log ID nhận được
    const userConfirmed = confirm("Bạn có chắc chắn muốn xóa ngân hàng này không?");
    if (userConfirmed) {
        try {
            const response = await fetch(`http://localhost:4000/rate/${bankID}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem('adminToken')}`,
                }
            });
            const result = await response.json();

            console.log(response); // Log phản hồi từ server
            console.log(result); // Log kết quả JSON

            if (response.ok) {
                alert("Ngân hàng đã được xóa thành công");
                document.getElementById(`rate-${bankID}`).remove();
            } else {
                alert(`Lỗi khi xóa ngân hàng: ${result.message}`);
            }
        } catch (error) {
            console.error("Error deleting bank:", error);
            //alert("Đã xảy ra lỗi khi xóa xe.");
        }
    }
}


