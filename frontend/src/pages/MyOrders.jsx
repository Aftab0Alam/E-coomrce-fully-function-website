import React, { useEffect, useState } from 'react';
import axios from '../axios';

const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await axios.get('/orders/my-orders', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setOrders(res.data);
      } catch (err) {
        alert('Failed to fetch orders');
      }
    };

    fetchOrders();
  }, [token]);

  return (
    <div className="container mt-5">
      <h3 className="mb-4">🧾 My Orders</h3>

      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        orders.map((order) => (
          <div key={order._id} className="card mb-3">
            <div className="card-body">
              <h5>Order ID: {order._id}</h5>
              <p><strong>Total:</strong> ₹{order.total}</p>
              <p><strong>Items:</strong></p>
              <ul>
                {order.items.map((item) => (
                  <li key={item._id}>
                    {item.name} — ₹{item.price} x {item.quantity}
                  </li>
                ))}
              </ul>
              <p className="text-muted">Placed on: {new Date(order.createdAt).toLocaleString()}</p>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default MyOrders;
