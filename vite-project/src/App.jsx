import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Buy from './components/Buy';
import Sell from './components/Sell';
import Services from './components/Services';
import Home from './components/Home';
import Footer from './components/Footer';
import './App.css';

const App = () => {
  return (
    <Router>
      <div>
        <Header />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/buy' element={<Buy />} />
          <Route path='/sell' element={<Sell />} />
          <Route path='/services' element={<Services />} />
        </Routes>
  
        <Footer />
      </div>
    </Router>
  );
}

export default App;
