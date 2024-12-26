async function fetchStaticDt(){
    try{
        const res=await fetch('http://localhost:3000/custormerStatic/',{
            method:'GET',
            headers: {
                'Content-Type': 'application/json',
                "Authorization":`Bearer ${localStorage.getItem('adminToken')}`
            },
        })
        const data=await res.json();

        const leastCarElement = document.getElementById("least-viewed-car");
        leastCarElement.innerHTML = `
            <h3>Xe được xem ít nhất</h3>
            <p>${data.leastCar[0].verName} - Giá: ${data.leastCar[0].price} triệu - Lượt xem: ${data.leastCar[0].viewed}</p>
        `;

        // Cập nhật ngân hàng ít được xem nhất
        const leastBankElement = document.getElementById("least-viewed-bank");
        leastBankElement.innerHTML = `
            <h3>Ngân hàng được xem ít nhất</h3>
            <p>${data.leastBank[0].BankName} - Lãi suất: ${data.leastBank[0].Rate}% - Lượt xem: ${data.leastBank[0].viewed}</p>
        `;

        // Cập nhật tổng lượt xem
        const totalViewsElement = document.getElementById("total-views");
        totalViewsElement.innerHTML = `
            <h3>Tổng lượt xem</h3>
            <p>${data.viewedSum}</p>
        `;

        // Cập nhật danh sách top ngân hàng
        const topBanksElement = document.querySelector("#top-banks tbody");
        topBanksElement.innerHTML = data.topBanks
            .map(
                (bank, index) => `
                <tr>
                    <td>${index + 1}</td>
                    <td>${bank.BankName}</td>
                    <td>${bank.Rate}</td>
                    <td>${bank.viewed}</td>
                </tr>`
            )
            .join("");

        // Cập nhật danh sách top xe
        const topCarsElement = document.querySelector("#top-cars tbody");
        topCarsElement.innerHTML = data.topCars
            .map(
                (car, index) => `
                <tr>
                    <td>${index + 1}</td>
                    <td>${car.verName}</td>
                    <td>${car.price}</td>
                    <td>${car.viewed}</td>
                </tr>`
            )
            .join("");

    }
    catch(err){
        console.log('Error fetching data: ',err);
    }
}