import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const AdminProductList = () => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  const fetchProducts = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/products/all');
      setProducts(res.data);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setError('Failed to fetch products');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDelete = async (id) => {
    const confirm = window.confirm('Are you sure you want to delete this product?');
    if (!confirm) return;

    try {
      await axios.delete(`http://localhost:5000/api/products/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}` // Make sure token is stored
        }
      });
      fetchProducts(); // Refresh list after delete
    } catch (err) {
      console.error(err);
      setError('Failed to delete product');
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4 text-center">📦 Admin - Product List</h2>

      {loading ? (
        <div className="text-center mt-4">Loading products...</div>
      ) : error ? (
        <div className="text-danger text-center">{error}</div>
      ) : (
        <table className="table table-bordered table-hover">
          <thead className="table-dark">
            <tr>
              <th>#</th>
              <th>Title</th>
              <th>Price</th>
              <th>Category</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((p, index) => (
              <tr key={p._id}>
                <td>{index + 1}</td>
                <td>{p.title}</td>
                <td>₹{p.price}</td>
                <td>{p.category}</td>
                <td>
                  <Link to={`/admin/products/edit/${p._id}`} className="btn btn-warning btn-sm me-2">
                    ✏️ Edit
                  </Link>
                  <button onClick={() => handleDelete(p._id)} className="btn btn-danger btn-sm">
                    🗑 Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AdminProductList;
