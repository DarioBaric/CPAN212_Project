import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function AddProduct() {
  const navigate = useNavigate();
  const [newProduct, setNewProduct] = useState({
    title: '',
    description: '',
    image: '',
    ratings: '',
    product_section: ''
  });

  const handleAddProduct = async () => {
    try {
      await axios.post('/api/save-product', newProduct);
      navigate('/');
    } catch (error) {
      console.error('Error adding product:', error);
    }
  };

  return (
    <div>
      <h1>Add New Product</h1>
      <input
        type="text"
        placeholder="Title"
        value={newProduct.title}
        onChange={e => setNewProduct({ ...newProduct, title: e.target.value })}
      />
      <input
        type="text"
        placeholder="Description"
        value={newProduct.description}
        onChange={e => setNewProduct({ ...newProduct, description: e.target.value })}
      />
      <input
        type="text"
        placeholder="Image"
        value={newProduct.image}
        onChange={e => setNewProduct({ ...newProduct, image: e.target.value })}
      />
      <input
        type="number"
        placeholder="Ratings"
        value={newProduct.ratings}
        onChange={e => setNewProduct({ ...newProduct, ratings: e.target.value })}
      />
      <input
        type="text"
        placeholder="Product Section"
        value={newProduct.product_section}
        onChange={e => setNewProduct({ ...newProduct, product_section: e.target.value })}
      />
      <button onClick={handleAddProduct}>Add Product</button>
    </div>
  );
}

export default AddProduct;
