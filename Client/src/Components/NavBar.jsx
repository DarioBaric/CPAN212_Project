// src/components/NavBar.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import './NavBar.css';

const NavBar = () => {
    return (
        <nav>
            <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/login">Login/Sign Up</Link></li>
                <li><Link to="/products">Products</Link></li>
            </ul>
        </nav>
    );
};

export default NavBar;
