import xlsx from 'xlsx';

function createExcelFile(data) {
    const workbook = xlsx.utils.book_new();

    // Rename columns in data to Vietnamese
    const renamedData = data.map(item => ({
        "Kỳ hạn": item.paymentPeriod,
        "Dư nợ đầu kỳ": item.startingBalance,
        "Tiền gốc": item.principalPayment,
        "Tiền lãi": item.interestPayment,
        "Tổng tiền": item.totalPayment,
        "Dư nợ cuối kỳ": item.endingBalance,
    }));

    // Create the worksheet from the renamed data
    const worksheet = xlsx.utils.json_to_sheet(renamedData);

    // Set column widths for better readability
    const columnWidths = renamedData[0] 
        ? Object.keys(renamedData[0]).map(() => ({ width: 20 })) 
        : [];
    worksheet['!cols'] = columnWidths;

    // Apply formatting: center alignment and number format with thousand separators
    Object.keys(worksheet).forEach(cell => {
        if (cell[0] !== '!') {
            const cellContent = worksheet[cell];
            cellContent.s = {
                alignment: {
                    horizontal: 'center',
                    vertical: 'center'
                }
            };

            // Check if the data is a number, and apply number formatting with commas
            if (typeof cellContent.v === 'number') {
                cellContent.s.numberFormat = '#,##0'; // Format numbers with thousand separators
            }
        }
    });

    // Add the worksheet to the workbook
    xlsx.utils.book_append_sheet(workbook, worksheet, 'Schedule');

    // Create buffer from workbook
    const buffer = xlsx.write(workbook, { bookType: 'xlsx', type: 'buffer' });

    return buffer;
}

export default { createExcelFile };
