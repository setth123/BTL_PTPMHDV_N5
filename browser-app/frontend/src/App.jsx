import './App.css'
import { BrowserRouter,Routes,Route } from 'react-router-dom'
import Header from './components/header/header'
import HomePage from './pages/home/HomePage'
import RcmCar from './pages/rcmCar/rcmCar'
import CarChart from './pages/chart/carChart'
import BankChart from './pages/chart/bankChart'
import '../index.css'; 
import PriceCalculate from './pages/priceCal/priceCal'
function App() {

  return (
    <>
      <BrowserRouter>
      <Header />
        <Routes>
        <Route path="/" element={<HomePage/>}/>
          <Route path="/" element={<HomePage/>}/>
          <Route path='/carChart' element={<CarChart/>}></Route>
          <Route path='/bankChart' element={<BankChart/>}></Route>
          <Route path='/recommendation' element={<RcmCar/>}></Route>
          <Route path='/calculate' element={<PriceCalculate/>}></Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
