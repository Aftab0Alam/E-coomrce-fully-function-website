import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import axios from '../axios';
import { useCart } from '../context/CartContext';

const ProductDetails = () => {
  const { id } = useParams();
  const { addToCart } = useCart();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [selectedSize, setSelectedSize] = useState('M'); // default size
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`/products/all`) // adjust this if you have single product fetch route
      .then((res) => {
        const found = res.data.find(p => p._id === id);
        setProduct(found);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Failed to fetch product', err);
        setLoading(false);
      });
  }, [id]);

  const handleAddToCart = () => {
    addToCart({ ...product, selectedSize });
    alert(`Added to cart with size ${selectedSize}`);
  };

  const handleBuyNow = () => {
    handleAddToCart();
    navigate('/cart');
  };

  if (loading) return <div className="text-center mt-5">Loading product...</div>;
  if (!product) return <div className="text-danger text-center mt-5">Product not found</div>;

  return (
    <div className="container mt-5">
      <Link to="/products" className="btn btn-outline-secondary mb-3">← Back to Products</Link>
      <div className="row">
        <div className="col-md-6">
          <img
            src={product.image}
            alt={product.title}
            className="img-fluid border"
            style={{ transition: '0.3s', cursor: 'zoom-in' }}
            onMouseOver={e => e.currentTarget.style.transform = 'scale(1.1)'}
            onMouseOut={e => e.currentTarget.style.transform = 'scale(1)'}
          />
        </div>
        <div className="col-md-6">
          <h2>{product.title}</h2>
          <p className="text-muted">{product.category}</p>
          <p>{product.description}</p>
          <h4 className="fw-bold">₹ {product.price}</h4>

          {/* Size Selection */}
          <div className="mb-3">
            <label className="form-label">Size:</label>
            <select
              className="form-select"
              value={selectedSize}
              onChange={(e) => setSelectedSize(e.target.value)}
            >
              <option value="S">Small (S)</option>
              <option value="M">Medium (M)</option>
              <option value="L">Large (L)</option>
              <option value="XL">Extra Large (XL)</option>
            </select>
          </div>

          {/* Buttons */}
          <button className="btn btn-success me-2" onClick={handleAddToCart}>Add to Cart</button>
          <button className="btn btn-primary" onClick={handleBuyNow}>Buy Now</button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
