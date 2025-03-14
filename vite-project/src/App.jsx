import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import Header from './components/Header';
import Buy from './components/Buy';
import Sell from './components/Sell';
import Services from './components/Services';
import Home from './components/Home';
import Footer from './components/Footer';
import LoginForm from './components/Login';
import Admin from './components/Admin';
import UserLogin from './components/UserLogin';
import AdminLogin from './components/AdminLogin';
import AdminRegister from './components/AdminRegister';
import UserRegister from './components/UserRegister';
import Inventory from './components/Inventory';
import SellData from './components/sellData';
import UsersData from './components/usersData';
import AboutUs from './components/AboutUs';
import AdminBuy from './components/AdminBuy';
import AdminSell from './components/AdminSell';
import AdminServices from './components/AdminServices';
import AdminUser from './components/AdminUser';
import UserProfile from './components/UserProfile';
import EditUserProfile from './components/EditUserProfile';
import Payment from  './components/Payment';
import OrderSuccess from './components/OrderSucess';
import SearchPage from './components/search';

import './App.css';

const theme = extendTheme({
  // Add your custom theme settings here
});

const App = () => {
  return (
    <ChakraProvider theme={theme}>
      <Router>
        
        <Header /> {/* Header is rendered outside of Routes */}
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/Home' element={<Home />} />
          <Route path='/LoginForm' element={<LoginForm />} />
          <Route path='/buy' element={<Buy />} />
          <Route path='/sell' element={<Sell />} />
          <Route path='/services' element={<Services />} />
          <Route path='/AboutUs' element={<AboutUs />} />
          <Route path='/AdminLogin' element={<AdminLogin />} />
          <Route path='/UserLogin' element={<UserLogin />} />
          <Route path='/UserRegister' element={<UserRegister />} />
          <Route path='/AdminRegister' element={<AdminRegister />} />
          <Route path='/Inventory' element={<Inventory />} />
          <Route path='/SellData' element={<SellData />} />
          <Route path='/UsersData' element={<UsersData />} />
          <Route path='/AdminUser' element={<AdminUser />} />
          <Route path='/AdminSell' element={<AdminSell />} />
          <Route path='/AdminServices' element={<AdminServices />} />
          <Route path='/AdminBuy' element={<AdminBuy />} />
          <Route path='/admin' element={<Admin />} /> 
          <Route path='/UserProfile' element={<UserProfile />} /> 
          <Route path='/EditUserProfile' element={<EditUserProfile />} /> 
          <Route path='/Payment' element={<Payment />} />
          <Route path='/OrderSuccess' element={<OrderSuccess />} />
          <Route path='/SearchPage' element={<SearchPage />} /> 

          {/* Render Admin routes */}
        </Routes>
        <Footer />
      </Router>
    </ChakraProvider>
  );
}

export default App;
