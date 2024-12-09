import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link, useNavigate } from 'react-router-dom';
import "./ProductDetail.css"; // Import the CSS file for styling

function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);

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

  const handleDelete = async () => {
    try {
      await axios.delete(`/api/delete-product`, { data: { _id: id } });
      navigate('/');
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{product.title}</h1>
      <p>{product.description}</p>
      <p>Ratings: {product.ratings}</p>
      <p>Product Section: {product.product_section}</p>
      <Link to={`/products/${product._id}/edit`}>Edit Product</Link>
      <button onClick={handleDelete}>Delete</button>
    </div>
  );
}

export default ProductDetail;
