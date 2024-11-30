import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function ProductList() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get('/api/fetch-all-products');
      console.log('Fetched data:', response.data); // Debugging log
      if (Array.isArray(response.data)) {
        setProducts(response.data);
      } else {
        console.error('Fetched data is not an array:', response.data);
      }
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  return (
    <div>
      <h1>Product List</h1>
      <ul>
        {Array.isArray(products) ? (
          products.map(product => (
            <li key={product._id}>
              <Link to={`/products/${product._id}`}>{product.title}</Link>
            </li>
          ))
        ) : (
          <p>No products found or fetched data is not an array.</p>
        )}
      </ul>
      <Link to="/products/new">Add New Product</Link>
    </div>
  );
}

export default ProductList;
