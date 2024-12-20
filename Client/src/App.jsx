// src/App.jsx
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from './Components/NavBar';
import Login from './pages/Login';
import Home from './pages/Home';
import Products from './pages/Products';
import Orders from './pages/Orders';

const App = () => {

    return (
        <Router>
            <div>
                <NavBar />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/products" element={<Products />} />
                    <Route path="/orders" element={<Orders />} />
                </Routes>
            </div>
        </Router>
    );
};

export default App;
