// add hovered class to selected list item
let list = document.querySelectorAll(".navigation li");

function activeLink() {
  list.forEach((item) => {
    item.classList.remove("hovered");
  });
  this.classList.add("hovered");
}

list.forEach((item) => item.addEventListener("mouseover", activeLink));

// Menu Toggle
let toggle = document.querySelector(".toggle");
let navigation = document.querySelector(".navigation");
let main = document.querySelector(".main");

toggle.onclick = function () {
  navigation.classList.toggle("active");
  main.classList.toggle("active");
};

function loadContent(page){
  fetch(page)
    .then(Response => {
      if (!Response.ok) throw new Error("Page not found");
      return Response.text();
    })
    .then(data => {
      document.getElementById('content').innerHTML = data;
    })
    .catch(error => {
        document.getElementById('content').innerHTML = `<p>Error: ${error.message}</p>`;
    });
}

// Function to show product info in modal
function showProductInfo(name, price, description) {
  document.getElementById('product-name').innerText = name;
  document.getElementById('product-price').innerText = price;
  document.getElementById('product-description').innerText = description;
  
  // Show modal
  document.getElementById('product-info-modal').style.display = 'flex';
}

// Function to close the modal
function closeModal() {
  document.getElementById('product-info-modal').style.display = 'none';
}

// Optional: Close modal if clicked outside of the modal content
window.onclick = function(event) {
  const modal = document.getElementById('product-info-modal');
  if (event.target === modal) {
      modal.style.display = 'none';
  }
}