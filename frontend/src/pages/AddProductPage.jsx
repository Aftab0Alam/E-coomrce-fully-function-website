import React, { useState } from 'react';
import axios from '../axios';
import { useNavigate } from 'react-router-dom';

const AddProductPage = () => {
  const [product, setProduct] = useState({
    title: '',
    description: '',
    price: '',
    category: '',
    image: '',
    inStock: true
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setProduct({
      ...product,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/products/add', product);
      alert('✅ Product Added!');
      navigate('/admin/dashboard');
    } catch (err) {
      console.error(err);
      alert('❌ Error adding product');
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: '600px' }}>
      <h3 className="mb-4">➕ Add New Product</h3>
      <form onSubmit={handleSubmit}>
        <input type="text" name="title" className="form-control mb-3" placeholder="Product Title" onChange={handleChange} required />
        <input type="text" name="description" className="form-control mb-3" placeholder="Description" onChange={handleChange} required />
        <input type="number" name="price" className="form-control mb-3" placeholder="Price" onChange={handleChange} required />
        <input type="text" name="category" className="form-control mb-3" placeholder="Category" onChange={handleChange} required />
        <input type="text" name="image" className="form-control mb-3" placeholder="Image URL" onChange={handleChange} required />
        <select name="inStock" className="form-control mb-3" onChange={handleChange}>
          <option value={true}>In Stock</option>
          <option value={false}>Out of Stock</option>
        </select>
        <button type="submit" className="btn btn-primary w-100">Add Product</button>
      </form>
    </div>
  );
};

export default AddProductPage;
