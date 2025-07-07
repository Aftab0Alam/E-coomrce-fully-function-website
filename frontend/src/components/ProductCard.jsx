import React from 'react';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';

const ProductCard = ({ product }) => {
  const { cartItems, addToCart, removeFromCart, decreaseQty } = useCart();

  const itemInCart = cartItems.find(item => item._id === product._id);

  return (
    <div className="card h-100 shadow-sm">
      <Link to={`/products/${product._id}`}>
        <img
          src={product.image}
          className="card-img-top"
          alt={product.name}
          style={{ height: '250px', objectFit: 'cover', cursor: 'pointer' }}
        />
      </Link>

      <div className="card-body d-flex flex-column">
        <h5 className="card-title">{product.name}</h5>
        <p className="text-muted mb-1">{product.category}</p>
        <p className="fw-bold mb-3">₹{product.price}</p>

        {itemInCart ? (
          <>
            <div className="d-flex justify-content-between align-items-center mb-2">
              <button
                className="btn btn-outline-secondary btn-sm"
                onClick={() => decreaseQty(product._id)}
              >
                ➖
              </button>
              <span>Qty: {itemInCart.quantity}</span>
              <button
                className="btn btn-outline-success btn-sm"
                onClick={() => addToCart(product)}
              >
                ➕
              </button>
            </div>

            <button
              className="btn btn-danger btn-sm"
              onClick={() => removeFromCart(product._id)}
            >
              Remove from Cart
            </button>
          </>
        ) : (
          <button
            className="btn btn-primary mt-auto"
            onClick={() => addToCart(product)}
          >
            Add to Cart
          </button>
        )}
      </div>
    </div>
  );
};

export default ProductCard;
