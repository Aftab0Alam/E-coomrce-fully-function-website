import React, { useState } from 'react';
import axios from 'axios';

const AddProduct = () => {
  const [product, setProduct] = useState({
    title: '',
    description: '',
    price: '',
    category: '',
    image: '',
    inStock: true,
  });

  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setProduct({ ...product, [name]: type === 'checkbox' ? checked : value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem('token'); // Get token from localStorage

      const res = await axios.post('http://localhost:5000/api/products/add', product, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setMessage('✅ Product added successfully!');
      setProduct({ title: '', description: '', price: '', category: '', image: '', inStock: true });

    } catch (err) {
      console.error(err);
      setMessage('❌ Failed to add product. Make sure you are logged in.');
    }
  };

  return (
    <div className="container mt-4">
      <h2>Add New Product</h2>
      {message && <div className="alert alert-info">{message}</div>}
      <form onSubmit={handleSubmit}>
        <input type="text" className="form-control mb-2" name="title" placeholder="Title" value={product.title} onChange={handleChange} required />
        <textarea className="form-control mb-2" name="description" placeholder="Description" value={product.description} onChange={handleChange} required />
        <input type="number" className="form-control mb-2" name="price" placeholder="Price" value={product.price} onChange={handleChange} required />
        <input type="text" className="form-control mb-2" name="category" placeholder="Category" value={product.category} onChange={handleChange} required />
        <input type="text" className="form-control mb-2" name="image" placeholder="Image URL" value={product.image} onChange={handleChange} required />
        <div className="form-check mb-3">
          <input className="form-check-input" type="checkbox" name="inStock" checked={product.inStock} onChange={handleChange} />
          <label className="form-check-label">In Stock</label>
        </div>
        <button type="submit" className="btn btn-primary">Add Product</button>
      </form>
    </div>
  );
};

export default AddProduct;
