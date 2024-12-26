// Hàm xóa car id
async function confirmDelete(carId,event) {
    event.stopPropagation(); // Ngăn sự kiện click lan truyền đến hàng
    console.log("Car ID received for deletion:", carId); // Log ID nhận được
    const userConfirmed = confirm("Bạn có chắc chắn muốn xóa xe này không?");
    if (userConfirmed) {
        try {
            const response = await fetch(`http://localhost:3000/car/${carId}`, {
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
                // Xóa hàng khỏi bảng dựa trên ID
                const row = document.querySelector(`tr[data-car-id="${carId}"]`);
                if (row) row.remove();
                // Tải lại danh sách xe
                await loadCars();
            } else {
                alert(`Lỗi khi xóa xe: ${result.message}`);
            }
        } catch (error) {
            console.error("Error deleting car:", error);
            
        }
    }
}

// hàm xóa bank theo id 
async function confirmDeleteBank(bankID) {
    //console.log("Car ID received for deletion:", carId); // Log ID nhận được
    const userConfirmed = confirm("Bạn có chắc chắn muốn xóa ngân hàng này không?");
    if (userConfirmed) {
        try {
            const response = await fetch(`http://localhost:3000/rate/${bankID}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    "Authorization":`Bearer ${localStorage.getItem('adminToken')}`
                }
            });
            const result = await response.json();

            console.log(response); // Log phản hồi từ server
            console.log(result); // Log kết quả JSON

            if (response.ok) {
                alert("Ngân hàng đã được xóa thành công");
                // Xóa hàng khỏi bảng dựa trên ID
                const row = document.querySelector(`tr[data-bank-id="${bankID}"]`);
                if (row) row.remove();
                // Tải lại danh sách ngân hàng
                await loadBanks();
            } else {
                alert(`Lỗi khi xóa ngân hàng: ${result.message}`);
            }
        } catch (error) {
            console.error("Error deleting bank:", error);
            //alert("Đã xảy ra lỗi khi xóa xe.");
        }
    }
}

