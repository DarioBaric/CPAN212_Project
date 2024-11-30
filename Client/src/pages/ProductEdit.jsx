import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

function ProductEdit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState({
    title: '',
    description: '',
    image: '',
    ratings: '',
    product_section: ''
  });

  useEffect(() => {
    fetchProduct();
  }, []);

  const fetchProduct = async () => {
    try {
      const response = await axios.get(`/api/product/${id}`);
      setProduct(response.data);
    } catch (error) {
      console.error('Error fetching product:', error);
    }
  };

  const handleUpdateProduct = async () => {
    try {
      await axios.put(`/api/product/${id}`, product);
      navigate(`/products/${id}`);
    } catch (error) {
      console.error('Error updating product:', error);
    }
  };

  return (
    <div>
      <h1>Edit Product</h1>
      <input
        type="text"
        placeholder="Title"
        value={product.title}
        onChange={e => setProduct({ ...product, title: e.target.value })}
      />
      <input
        type="text"
        placeholder="Description"
        value={product.description}
        onChange={e => setProduct({ ...product, description: e.target.value })}
      />
      <input
        type="text"
        placeholder="Image"
        value={product.image}
        onChange={e => setProduct({ ...product, image: e.target.value })}
      />
      <input
        type="number"
        placeholder="Ratings"
        value={product.ratings}
        onChange={e => setProduct({ ...product, ratings: e.target.value })}
      />
      <input
        type="text"
        placeholder="Product Section"
        value={product.product_section}
        onChange={e => setProduct({ ...product, product_section: e.target.value })}
      />
      <button onClick={handleUpdateProduct}>Update Product</button>
    </div>
  );
}

export default ProductEdit;
