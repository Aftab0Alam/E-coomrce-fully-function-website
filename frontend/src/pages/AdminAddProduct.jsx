import React, { useState } from 'react';
import axios from '../axios';

const AdminAddProduct = () => {
  const [form, setForm] = useState({
    title: '',
    description: '',
    price: '',
    category: '',
    image: '',
    inStock: true,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({
      ...form,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (Number(form.price) <= 0) {
      return alert('❌ Price must be greater than 0');
    }

    try {
      const token = localStorage.getItem('token');
      await axios.post('/products/add', form, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      alert('✅ Product added successfully!');
      setForm({
        title: '',
        description: '',
        price: '',
        category: '',
        image: '',
        inStock: true,
      });
    } catch (err) {
      console.error(err);
      alert('❌ Failed to add product');
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: '600px' }}>
      <h3 className="mb-4">➕ Add New Product</h3>
      <form onSubmit={handleSubmit}>
        <input
          className="form-control mb-3"
          name="title"
          placeholder="Product Title"
          value={form.title}
          onChange={handleChange}
          required
        />
        <input
          className="form-control mb-3"
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
          required
        />
        <input
          className="form-control mb-3"
          name="price"
          type="number"
          placeholder="Price"
          value={form.price}
          onChange={handleChange}
          required
        />

        {/* ✅ Category Dropdown */}
        <select
          className="form-control mb-3"
          name="category"
          value={form.category}
          onChange={handleChange}
          required
        >
          <option value="">Select Category</option>
          <option value="Men">Men</option>
          <option value="Women">Women</option>
          <option value="Kids">Kids</option>
        </select>

        <input
          className="form-control mb-3"
          name="image"
          placeholder="Image URL"
          value={form.image}
          onChange={handleChange}
          required
        />
        <div className="form-check mb-3">
          <input
            className="form-check-input"
            type="checkbox"
            name="inStock"
            checked={form.inStock}
            onChange={handleChange}
          />
          <label className="form-check-label">In Stock</label>
        </div>
        <button className="btn btn-success w-100" type="submit">
          Add Product
        </button>
      </form>
    </div>
  );
};

export default AdminAddProduct;
