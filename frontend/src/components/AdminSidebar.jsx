import React from 'react';
import { Link } from 'react-router-dom';

const AdminSidebar = () => {
  return (
    <div className="d-flex flex-column flex-shrink-0 p-3 text-white bg-dark vh-100" style={{ width: '250px' }}>
      <Link to="/admin/dashboard" className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none fs-4">
        🛠️ Admin Panel
      </Link>
      <hr />
      <ul className="nav nav-pills flex-column mb-auto">
        <li><Link to="/admin/dashboard" className="nav-link text-white">📊 Dashboard</Link></li>
        <li><Link to="/admin/add-product" className="nav-link text-white">➕ Add Product</Link></li>
        <li><Link to="/admin/orders" className="nav-link text-white">📦 Manage Orders</Link></li>
      </ul>
    </div>
  );
};

export default AdminSidebar;
