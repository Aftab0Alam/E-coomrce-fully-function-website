import React, { useEffect, useState } from 'react';
import axios from '../axios';
import { useNavigate } from 'react-router-dom';

const UserDashboard = () => {
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (!user || !token) return navigate('/login');

    const fetchOrders = async () => {
      try {
        const res = await axios.get('/orders/my-orders', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setOrders(res.data);
      } catch (err) {
        console.error('Error fetching orders:', err);
      }
    };

    fetchOrders();
  }, [token, user, navigate]);

  return (
    <div className="container mt-5 pt-4">
      <h3>👋 Welcome, {user?.name || 'User'}</h3>
      <hr />

      <div className="mb-4">
        <h5>📧 Email: {user?.email}</h5>
        <h6>🧑 Role: {user?.isAdmin ? 'Admin' : 'Customer'}</h6>
      </div>

      <h4 className="mt-5 mb-3">📦 My Orders</h4>

      {orders.length === 0 ? (
        <div className="text-muted">You haven’t placed any orders yet.</div>
      ) : (
        <div className="table-responsive">
          <table className="table table-bordered align-middle">
            <thead className="table-dark">
              <tr>
                <th>Order ID</th>
                <th>Items</th>
                <th>Total</th>
                <th>Ordered On</th>
              </tr>
            </thead>
            <tbody>
              {orders.map(order => (
                <tr key={order._id}>
                  <td>{order._id.slice(0, 8)}...</td>
                  <td>
                    {order.items.map(item => (
                      <div key={item._id}>
                        {item.name} (x{item.quantity})
                      </div>
                    ))}
                  </td>
                  <td>₹{order.total}</td>
                  <td>{new Date(order.createdAt).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default UserDashboard;
