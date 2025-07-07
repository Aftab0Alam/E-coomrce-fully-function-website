import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminLogin = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Hardcoded admin check
    if (formData.email === 'admin@gmail.com' && formData.password === 'admin123') {
      localStorage.setItem('isAdmin', true);
      navigate('/admin/dashboard');
    } else {
      alert('Invalid admin credentials');
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: '500px' }}>
      <h3>Admin Login</h3>
      <form onSubmit={handleSubmit}>
        <input type="email" name="email" className="form-control mb-3" placeholder="Admin Email" onChange={handleChange} required />
        <input type="password" name="password" className="form-control mb-3" placeholder="Password" onChange={handleChange} required />
        <button className="btn btn-dark w-100">Login</button>
      </form>
    </div>
  );
};

export default AdminLogin;
