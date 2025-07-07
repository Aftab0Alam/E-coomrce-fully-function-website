import React, { useEffect, useState } from 'react';
import axios from '../axios';
import { useNavigate } from 'react-router-dom';
import AdminSidebar from '../components/AdminSidebar';

const AdminDashboard = () => {
  const [summary, setSummary] = useState({});
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const user = JSON.parse(localStorage.getItem('user'));

    if (!token || !user?.isAdmin) {
      alert('Access denied. Admins only!');
      return navigate('/');
    }

    const fetchSummary = async () => {
      try {
        const res = await axios.get('/admin/summary', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setSummary(res.data);
      } catch (err) {
        alert('Unauthorized or error fetching summary');
        navigate('/');
      } finally {
        setLoading(false);
      }
    };

    fetchSummary();
  }, []);

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="spinner-border text-primary" role="status" />
      </div>
    );
  }

  return (
    <div className="d-flex">
      <AdminSidebar />

      <div className="container-fluid p-4">
        <h3 className="mb-4">📊 Admin Dashboard</h3>
        <div className="row g-4">

          <div className="col-md-4">
            <div className="card text-white bg-success h-100 shadow">
              <div className="card-body text-center">
                <h5 className="card-title">🧥 Total Products</h5>
                <h2>{summary.totalProducts || 0}</h2>
              </div>
            </div>
          </div>

          <div className="col-md-4">
            <div className="card text-white bg-primary h-100 shadow">
              <div className="card-body text-center">
                <h5 className="card-title">👤 Total Users</h5>
                <h2>{summary.totalUsers || 0}</h2>
              </div>
            </div>
          </div>

          <div className="col-md-4">
            <div className="card text-dark bg-warning h-100 shadow">
              <div className="card-body text-center">
                <h5 className="card-title">📦 Total Orders</h5>
                <h2>{summary.totalOrders || 0}</h2>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
