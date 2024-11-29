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