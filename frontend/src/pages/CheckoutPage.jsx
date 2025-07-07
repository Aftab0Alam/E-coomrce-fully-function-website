import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import axios from '../axios';
import { useNavigate } from 'react-router-dom';

const CheckoutPage = () => {
  const { cartItems, clearCart } = useCart();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    fullName: '',
    phone: '',
    address: '',
    pincode: '',
    district: '',
    state: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const getTotal = () =>
    cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    const user = JSON.parse(localStorage.getItem('user'));

    if (!token || !user) {
      alert('Please login to place an order.');
      return navigate('/login');
    }

    try {
      const orderData = {
        user: user._id,
        items: cartItems,
        total: getTotal(),
        shippingDetails: form,
      };

      await axios.post('/orders/place', orderData, {
        headers: { Authorization: `Bearer ${token}` },
      });

      clearCart();
      alert('✅ Order placed successfully!');
      navigate('/');
    } catch (err) {
      console.error(err);
      alert('❌ Failed to place order');
    }
  };

  return (
    <div className="container mt-5">
      <h3 className="mb-4">🧾 Checkout</h3>
      <div className="row">
        {/* Left: Address Form */}
        <div className="col-md-7">
          <form onSubmit={handlePlaceOrder}>
            <div className="mb-3">
              <label className="form-label">Full Name</label>
              <input type="text" className="form-control" name="fullName" value={form.fullName} onChange={handleChange} required />
            </div>
            <div className="mb-3">
              <label className="form-label">Phone Number</label>
              <input type="tel" className="form-control" name="phone" value={form.phone} onChange={handleChange} required />
            </div>
            <div className="mb-3">
              <label className="form-label">Address</label>
              <textarea className="form-control" name="address" rows="3" value={form.address} onChange={handleChange} required></textarea>
            </div>
            <div className="mb-3">
              <label className="form-label">Pincode</label>
              <input type="text" className="form-control" name="pincode" value={form.pincode} onChange={handleChange} required />
            </div>
            <div className="mb-3">
              <label className="form-label">District</label>
              <input type="text" className="form-control" name="district" value={form.district} onChange={handleChange} required />
            </div>
            <div className="mb-3">
              <label className="form-label">State</label>
              <input type="text" className="form-control" name="state" value={form.state} onChange={handleChange} required />
            </div>

            <button type="submit" className="btn btn-success w-100">
              🛍️ Place Order
            </button>
          </form>
        </div>

        {/* Right: Order Summary */}
        <div className="col-md-5 mt-4 mt-md-0">
          <h5 className="mb-3">Order Summary</h5>
          <ul className="list-group mb-3">
            {cartItems.map((item) => (
              <li key={item._id} className="list-group-item d-flex justify-content-between align-items-center">
                <div>
                  <strong>{item.name}</strong> <br />
                  <small>Qty: {item.quantity}</small>
                </div>
                <span>₹{item.price * item.quantity}</span>
              </li>
            ))}
            <li className="list-group-item d-flex justify-content-between">
              <strong>Total</strong>
              <strong>₹{getTotal()}</strong>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
