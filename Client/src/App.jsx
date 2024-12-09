// src/App.jsx
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from './Components/NavBar';
import Login from './pages/Login';
import Home from './pages/Home';
import Products from './pages/Products';
import SearchBar from './Components/SearchBar';
import SideMenu from './Components/SideMenu';

const App = () => {
    const [filters, setFilters] = useState({});

    return (
        <Router>
            <div>
                <NavBar />
                <SearchBar setFilters={setFilters} />
                <SideMenu />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/products" element={<Products filters={filters} />} />
                </Routes>
            </div>
        </Router>
    );
};

export default App;
