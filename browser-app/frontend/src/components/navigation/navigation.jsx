import './navigation.css';
import { Link } from 'react-router-dom';
const Navigation = () => {
    return (
        <div className='navbar'>
            <a href="/recommendation" className="nav-item">Gợi ý</a>
            <Link to="/" className="nav-item">Trang chủ</Link>
            <Link to="/calculate" className="nav-item">Tính giá trả góp</Link>
            <Link to="/carChart" className="nav-item">Biểu đồ thông tin xe</Link>
            <Link to="/bankChart" className="nav-item">Biểu đồ thông tin ngân hàng</Link>
        </div>
    )
}

export default Navigation;