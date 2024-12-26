import './App.css';
import  WelcomePage from './pages/Welcome';
import Registration from './pages/Registration';
import { Route, Routes } from 'react-router-dom';
import BuyerDashboard from './Buyer/BuyerDashboard';
import SellerDashboard from './Seller/SellerDashboard';


function App() {
  return (
    <Routes>
    <Route path="/" element={< WelcomePage/>} />
    <Route path="/register" element={<Registration />} />
    <Route path="/BuyerDashboard" element={<BuyerDashboard></BuyerDashboard>}/>
    <Route path="/SellerDashboard" element={<SellerDashboard/>}/>

    
   
  </Routes>
  );
}

export default App;

