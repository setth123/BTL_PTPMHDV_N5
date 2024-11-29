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