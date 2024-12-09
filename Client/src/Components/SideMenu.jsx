// src/components/SideMenu.js
import React, { useState } from 'react';

const SideMenu = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div>
            <button onClick={() => setIsOpen(!isOpen)}>
                {isOpen ? 'Close Menu' : 'Open Menu'}
            </button>
            {isOpen && (
                <div>
                    <ul>
                        <li>My Account Details</li>
                        <li>Track Order</li>
                        <li>Logout</li>
                    </ul>
                </div>
            )}
        </div>
    );
};

export default SideMenu;
