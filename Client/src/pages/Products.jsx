import React, { useEffect, useState } from 'react';

const Products = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            console.log("Fetching products...");
            const response = await fetch('http://localhost:8000/fetch-products'); 
            console.log("Response status:", response.status);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            console.log("Data received:", data);
            setProducts(data);
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };
    

    const renderProduct = (products) => (
        <li key={products._id} style={{ border: '1px solid #ccc', padding: '10px', margin: '5px' }}>
            <h3>{products.title}</h3>
            <p>{products.description}</p>
            {products.image && <img src={products.image} alt={products.title} style={{ maxWidth: '100px', height: 'auto' }} />}
            <p>Ratings: {products.ratings}</p>
            <p>Section: {products.product_section}</p>
        </li>
    );

    return (
        <div>
            <h2>Products</h2>
            <ul style={{ listStyleType: 'none', padding: 0 }}>
                {products.map(product => renderProduct(product))}
            </ul>
        </div>
    );
};

export default Products;
