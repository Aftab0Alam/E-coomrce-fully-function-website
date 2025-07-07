import React from 'react';
import { useCart } from '../context/CartContext';
import { Link, useNavigate } from 'react-router-dom';

const CartPage = () => {
  const { cartItems, addToCart, decreaseQty, removeFromCart, clearCart } = useCart();
  const navigate = useNavigate();

  const getTotal = () =>
    cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  const handleCheckout = () => {
    if (cartItems.length === 0) {
      alert('Cart is empty!');
      return;
    }
    navigate('/checkout');
  };

  if (cartItems.length === 0) {
    return (
      <div className="container mt-5 text-center">
        <h3>🛒 Your Cart is Empty</h3>
        <Link className="btn btn-primary mt-3" to="/products">
          🛍️ Shop Now
        </Link>
      </div>
    );
  }

  return (
    <div className="container mt-5">
      <h3 className="mb-4">🛒 Your Cart</h3>

      <div className="table-responsive">
        <table className="table align-middle">
          <thead className="table-dark">
            <tr>
              <th>Product</th>
              <th>Qty</th>
              <th>Price</th>
              <th>Subtotal</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {cartItems.map((item) => (
              <tr key={item._id}>
                <td>
                  <strong>{item.name}</strong>
                  <br />
                  <small className="text-muted">{item.category}</small>
                </td>
                <td>
                  <div className="d-flex align-items-center">
                    <button
                      className="btn btn-sm btn-secondary me-2"
                      onClick={() => decreaseQty(item._id)}
                    >
                      -
                    </button>
                    {item.quantity}
                    <button
                      className="btn btn-sm btn-secondary ms-2"
                      onClick={() => addToCart(item)}
                    >
                      +
                    </button>
                  </div>
                </td>
                <td>₹{item.price}</td>
                <td>₹{item.price * item.quantity}</td>
                <td>
                  <button
                    className="btn btn-sm btn-danger"
                    onClick={() => removeFromCart(item._id)}
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="d-flex justify-content-between align-items-center mt-4">
        <button className="btn btn-outline-danger" onClick={clearCart}>
          🧹 Clear Cart
        </button>
        <h4>Total: ₹{getTotal()}</h4>
        <button className="btn btn-success" onClick={handleCheckout}>
          🧾 Proceed to Checkout
        </button>
      </div>
    </div>
  );
};

export default CartPage;
