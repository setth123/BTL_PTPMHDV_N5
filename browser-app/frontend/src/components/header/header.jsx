import Navigation from "../navigation/navigation";

const Header = () => {
    return (
        <div style={{
            display: "flex",
            alignItems: "center",
            padding: "10px 20px", // Khoảng cách xung quanh header
            backgroundColor: "#f8f9fa", // Màu nền nhẹ
            boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)" // Hiệu ứng bóng
        }}>
            <div style={{ marginRight: "20px" }}>
                <a href="/">
                    <img 
                        src="https://upload.wikimedia.org/wikipedia/commons/2/29/Logo_of_VinFast_%283D%29.svg" 
                        width="75" 
                        alt="VinFast Logo"
                        style={{
                            display: "block", 
                            height: "auto", // Đảm bảo tỷ lệ logo
                        }}
                    />
                </a>
            </div>
            <div style={{ flexGrow: 1 }}>
                <Navigation />
            </div>
        </div>
    );
}

export default Header;
