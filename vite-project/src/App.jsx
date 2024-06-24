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
import './App.css';

// Optionally, extend the theme here if you have custom theme settings
const theme = extendTheme({
  // Add your custom theme settings here
});

const App = () => {
  return (
    <ChakraProvider theme={theme}>
      <Router>
        <div>
          <Header />
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/buy' element={<Buy />} />
            <Route path='/sell' element={<Sell />} />
            <Route path='/services' element={<Services />} />
            <Route path='/login' element={<LoginForm />} />
            <Route path='/admin' element={<Admin />} />
            <Route path='/AdminLogin' element={<AdminLogin />} />
            <Route path='/UserLogin' element={<UserLogin />} />
          </Routes>
          <Footer />
        </div>
      </Router>
    </ChakraProvider>
  );
}

export default App;
