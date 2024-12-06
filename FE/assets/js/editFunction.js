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
        const response = await fetch(`http://localhost:3000/rate/editrate/${tablename}/${anythingId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                "Authorization":`Bearer ${localStorage.getItem('adminToken')}`
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
        console.log(`Received PUT request: ${tablename}, ${carId}`);
        console.log('Data:', editData);
        const response = await fetch(`http://localhost:3000/car/editcar/${tablename}/${carId}`, {
            method: 'PUT',  // Chuyển thành PUT thay vì POST
            headers: {
                'Content-Type': 'application/json',
                "Authorization":`Bearer ${localStorage.getItem('adminToken')}`
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
    
    // Cập nhật thêm id của phiên bản vào form để có thể dễ dàng gửi cập nhật sau
    form.dataset.versionId = version._id; // Giả sử `version.id` là id của phiên bản
    console.log(version._id);    
}

async function fetchCarLines() {
    try {
        const response = await fetch('http://localhost:3000/car', {
            headers: {
                "Authorization":`Bearer ${localStorage.getItem('adminToken')}`
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
        const response = await fetch(`http://localhost:3000/carVer/editcarver/CarVersion/${versionId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                "Authorization":`Bearer ${localStorage.getItem('adminToken')}`
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