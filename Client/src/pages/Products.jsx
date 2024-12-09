// src/pages/Products.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Products = ({ filters }) => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        fetchProducts();
    }, [filters]);

    const fetchProducts = async () => {
        try {
            const response = await axios.get('/api/fetch-filter-products', { params: filters });
            setProducts(response.data);
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };

    return (
        <div>
            <h2>Products</h2>
            <div>
                <label>
                    Filter by category:
                    <select name="product_section" onChange={(e) => filters.setFilters({ ...filters, product_section: e.target.value })}>
                        <option value="">All</option>
                        <option value="Category 1">Category 1</option>
                        <option value="Category 2">Category 2</option>
                    </select>
                </label>
            </div>
            <ul>
                {products.map(product => (
                    <li key={product.id}>{product.title}</li>
                ))}
            </ul>
        </div>
    );
};

export default Products;
