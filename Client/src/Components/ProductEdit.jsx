import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import "./ProductEdit.css"; // Import the CSS file for styling

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
  }, [id]);

  const fetchProduct = async () => {
    try {
      const response = await axios.get(`/api/product/${id}`);
      setProduct(response.data);
    } catch (error) {
      console.error('Error fetching product:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct(prevProduct => ({
      ...prevProduct,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
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
      <form onSubmit={handleSubmit}>
        <label>
          Title:
          <input
            type="text"
            name="title"
            value={product.title}
            onChange={handleChange}
            required
          />
        </label>
        <br />
        <label>
          Description:
          <textarea
            name="description"
            value={product.description}
            onChange={handleChange}
            required
          />
        </label>
        <br />
        <label>
          Image:
          <input
            type="text"
            name="image"
            value={product.image}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Ratings:
          <input
            type="number"
            name="ratings"
            value={product.ratings}
            onChange={handleChange}
            required
          />
        </label>
        <br />
        <label>
          Product Section:
          <input
            type="text"
            name="product_section"
            value={product.product_section}
            onChange={handleChange}
            required
          />
        </label>
        <br />
        <button type="submit">Update Product</button>
      </form>
    </div>
  );
}

export default ProductEdit;
