import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import "./AddProduct.css"; // Import the CSS file for styling

function AddProduct() {
  const navigate = useNavigate();
  const [newProduct, setNewProduct] = useState({
    title: '',
    description: '',
    image: '',
    ratings: '',
    product_section: '',
    features: [''],
    benefits: ['']
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewProduct(prevProduct => ({
      ...prevProduct,
      [name]: value
    }));
  };

  const handleArrayChange = (e, index, key) => {
    const { value } = e.target;
    setNewProduct(prevProduct => {
      const updatedArray = [...prevProduct[key]];
      updatedArray[index] = value;
      return { ...prevProduct, [key]: updatedArray };
    });
  };

  const addArrayItem = (key) => {
    setNewProduct(prevProduct => ({
      ...prevProduct,
      [key]: [...prevProduct[key], '']
    }));
  };

  const removeArrayItem = (index, key) => {
    setNewProduct(prevProduct => {
      const updatedArray = [...prevProduct[key]];
      updatedArray.splice(index, 1);
      return { ...prevProduct, [key]: updatedArray };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
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
      <form onSubmit={handleSubmit}>
        <label>
          Title:
          <input
            type="text"
            name="title"
            value={newProduct.title}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Description:
          <textarea
            name="description"
            value={newProduct.description}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Image:
          <input
            type="text"
            name="image"
            value={newProduct.image}
            onChange={handleChange}
          />
        </label>
        <label>
          Ratings:
          <input
            type="number"
            name="ratings"
            value={newProduct.ratings}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Product Section:
          <input
            type="text"
            name="product_section"
            value={newProduct.product_section}
            onChange={handleChange}
            required
          />
        </label>

        <button type="submit">Add Product</button>
      </form>
    </div>
  );
}

export default AddProduct;
