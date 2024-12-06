async function sendData(url, data) {
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('adminToken')}`,
      },
      body: JSON.stringify(data)
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error('Error sending data:', error);
    throw error;
  }
}


function createModalHTML() {
  const modalHTML = `
    <div id="generic-modal" class="add-modal" style="display: none;" aria-hidden="true">
      <div class="modal-add-content">
        <span class="close-btn" onclick="closeAddModal()">&times;</span>
        <h3 id="modal-add-title">Form Title</h3>
        <form id="modal-form" method="POST"></form>
      </div>
    </div>
  `;
  document.body.insertAdjacentHTML('beforeend', modalHTML);
}

// Handle form submission
async function submitForm(event) {
  event.preventDefault();
  const form = event.target;
  const formType = form.getAttribute('data-form-type');
  const formData = new FormData(form);

  // Chuyển đổi FormData thành một đối tượng plain object
  const data = {};
  formData.forEach((value, key) => {
    if (key === 'isBaterry') {
      data[key] = value === 'true';
    } else {
      data[key] = value;
    }
  });

  try {
    const response = await sendData(form.action, data);

    // Nếu gửi thành công
    form.reset();
    alert('Thêm Thành Công!');
    // loadCars();
    // // Lấy carID từ form data
    // const carID = data.carID;
    // if (carID) {
    //   // Đóng modal thêm mới
    //   closeAddModal();
      
    //   // Load lại modal chi tiết xe với carID mới
    //   await showCarDetails(carID);
    // }
    // loadBanks();
    // closeAddModal();
    switch(formType) {
      case 'car':
        await loadCars();
        closeAddModal();
        break;
      
      case 'carVer':
        closeAddModal();
        if (data.carID) {
          await showCarDetails(data.carID);
        }
        break;
      
      case 'rate':
        await loadBanks();
        closeAddModal();
        break;
      
      default:
        closeAddModal();
      }    
  } catch (error) {
    alert('An error occurred while submitting the form. Please try again.');
    console.error('Error:', error);
  }
}

// Open modal and populate form
function openAddModal(formType) {
  const modal = document.getElementById('generic-modal');
  const modalTitle = document.getElementById('modal-add-title');
  const modalForm = document.getElementById('modal-form');
  let carValue;
  if (formType === 'carVer') {  // Sử dụng chuỗi 'carVer' thay vì biến carVer
    const carIdInput = document.getElementById('car-id-input');
    carValue = carIdInput.value;
    console.log('carValue:', carValue); // Để debug
  }
  modalForm.innerHTML = '';
  modalForm.removeEventListener('submit', submitForm);

  const formConfig = {
      car: {
          title: 'Thêm Xe Mới',
          action: 'http://localhost:3000/car',
          fields: [
              { name: 'name', label: 'Tên xe:', type: 'text', placeholder: 'Tên xe' },
              { name: 'pictureURL', label: 'Ảnh xe:', type: 'url', placeholder: 'URL ảnh' }
          ]
      },
      carVer: {
        title: 'Thêm Phiên Bản Xe Mới',
        action: 'http://localhost:3000/carVer',
        fields: [
          { name: 'carID', label: '', type: 'hidden', value: carValue},  // Gán giá trị carId vào trường này
          { name: 'verName', label: 'Tên phiên bản:', type: 'text', placeholder: 'Tên phiên bản' },
          { name: 'isBaterry', label: 'Loại nhiên liệu:', type: 'select', options: [
            { value: 'true', text: 'Electric' },
            { value: 'false', text: 'Gasoline', selected: true }
          ]},
          { name: 'price', label: 'Giá:', type: 'number', placeholder: 'Giá' },
          { name: 'acceleration', label: 'Tốc độ tăng tốc (giây):', type: 'number', placeholder: 'Tốc độ tăng tốc' },
          { name: 'battery', label: 'Dung lượng pin (kWh):', type: 'number', placeholder: 'Dung lượng pin' },
          { name: 'maxPower', label: 'Công suất tối đa (mã lực):', type: 'number', placeholder: 'Công suất tối đa' },
          { name: 'seatsNumber', label: 'Số chỗ ngồi:', type: 'number', placeholder: 'Số chỗ ngồi' },
          { name: 'weight', label: 'Trọng lượng (kg):', type: 'number', placeholder: 'Trọng lượng' },
          { name: 'height', label: 'Chiều cao (mm):', type: 'number', placeholder: 'Chiều cao' },
          { name: 'length', label: 'Chiều dài (mm):', type: 'number', placeholder: 'Chiều dài' },
          { name: 'width', label: 'Chiều rộng (mm):', type: 'number', placeholder: 'Chiều rộng' },
          { name: 'dist', label: 'Cự ly (km):', type: 'number', placeholder: 'Cự ly' }
        ]
      },
      rate: {
        title: 'Thêm Thông Tin Về Lãi Suất Ngân Hàng Mới',
        action: 'http://localhost:3000/rate',
        fields: [
          { name: 'BankName', label: 'Tên Ngân Hàng:', type: 'text', placeholder: 'Tên Ngân Hàng' },
          { name: 'MaxPercent', label: 'Phần trăm tối đa:', type: 'number', placeholder: 'Phần trăm tối đa' },
          { name: 'MaxTerm', label: 'Thời gian tối đa (tháng):', type: 'number', placeholder: 'Thời gian tối đa' },
          { name: 'Rate', label: 'Lãi suất (%):', type: 'number', placeholder: 'Lãi suất' }
        ]
      }
  };

  const config = formConfig[formType];
  if (!config) {
      console.error('Invalid form type');
      return;
  }

  modalTitle.innerText = config.title;
  modalForm.action = config.action;
  modalForm.setAttribute('data-form-type', formType);

  config.fields.forEach(field => {
      const label = document.createElement('label');
      label.htmlFor = field.name;
      label.textContent = field.label;
      modalForm.appendChild(label);
      
      if (field.type === 'select') {
          const select = document.createElement('select');
          select.name = field.name;
          select.id = field.name;
          select.required = true;
          field.options.forEach(option => {
              const optionElement = document.createElement('option');
              optionElement.value = option.value;
              optionElement.textContent = option.text;
              if (option.selected) optionElement.selected = true;
              select.appendChild(optionElement);
          });
          
          modalForm.appendChild(select);
      } else {
          const input = document.createElement('input');
          input.type = field.type;
          input.name = field.name;
          input.id = field.name;
          input.placeholder = field.placeholder;
          input.required = true;
          // Thêm dòng này để gán value
          if (field.value !== undefined) {
            input.value = field.value;
          }
          modalForm.appendChild(input);
      }
  });

  const submitButton = document.createElement('button');
  submitButton.type = 'submit';
  submitButton.textContent = 'Gửi';
  modalForm.appendChild(submitButton);

  modalForm.addEventListener('submit', submitForm);
  
  // Show the modal
  modal.style.display = 'flex';
  modal.setAttribute('aria-hidden', 'false');
}

// Close modal
function closeAddModal() {
  const modal = document.getElementById('generic-modal');
  modal.style.display = 'none';
  modal.setAttribute('aria-hidden', 'true');
}

// Close modal when clicking outside
window.onclick = function(event) {
  const modal = document.getElementById('generic-modal');
  if (event.target === modal) {
    closeAddModal();
  }
}

// Initialize the modal
createModalHTML();