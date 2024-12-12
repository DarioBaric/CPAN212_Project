import React, { useEffect, useState } from 'react';

const Products = () => {
    const [products, setProducts] = useState([]);
    const [newProduct, setNewProduct] = useState({
        title: '',
        description: '',
        image: '',
        ratings: 0,
        product_section: '',
        price: 0
    });
    
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
            <p>Price: {products.price}</p>
            <button onClick={() => deleteProduct(products._id)}>Delete Product</button>
        </li>
    );

    const createProduct = async () => {
        try {
            const response = await fetch('http://localhost:8000/products', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newProduct)
            });
            const data = await response.json();
            setProducts([...products, data]);
        } catch (error) {
            console.error('Error creating product:', error);
        }
    };

    const deleteProduct = async (id) => {
        try {
            await fetch(`http://localhost:8000/products/${id}`, {
                method: 'DELETE'
            });
            setProducts(products.filter(products => products._id !== id));
        } catch (error) {
            console.error('Error deleting product:', error);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewProduct({
            ...newProduct,
            [name]: value
        });
    };

    return (
        <div>
            <h2>Products</h2>
            <div>
                <h3>Create New Product</h3>
                <input type="text" name="title" placeholder="Title" onChange={handleInputChange} />
                <input type="text" name="description" placeholder="Description" onChange={handleInputChange} />
                <input type="text" name="image" placeholder="Image URL" onChange={handleInputChange} />
                <input type="number" name="ratings" placeholder="Ratings" onChange={handleInputChange} />
                <input type="text" name="product_section" placeholder="Product Section" onChange={handleInputChange} />
                <input type="number" name="price" placeholder="Price" onChange={handleInputChange} />
                <button onClick={createProduct}>Create Product</button>
            </div>
            <ul style={{ listStyleType: 'none', padding: 0 }}>
                {products.map(product => renderProduct(product))}
            </ul>
        </div>
    );
};

export default Products;

