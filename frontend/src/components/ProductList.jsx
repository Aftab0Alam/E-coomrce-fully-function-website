import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ProductCard from '../components/ProductCard';

const ProductList = () => {
  const [filtered, setFiltered] = useState([]);
  const [search, setSearch] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [category, setCategory] = useState('');
  const [sort, setSort] = useState(''); // NEW: sort by price
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch products with filters and sorting
  useEffect(() => {
    const fetchFilteredProducts = async () => {
      setLoading(true);
      try {
        const params = {};
        if (search.trim()) params.search = search.trim();
        if (maxPrice) params.maxPrice = maxPrice;
        if (category) params.category = category;
        if (sort) params.sort = sort;

        const res = await axios.get('http://localhost:5000/api/products/all', { params });
        setFiltered(res.data);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setError('❌ Failed to fetch products');
        setLoading(false);
      }
    };

    fetchFilteredProducts();
  }, [search, maxPrice, category, sort]);

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">🛍 All Products</h2>

      {/* 🔍 Filters */}
      <div className="row mb-4">
        <div className="col-md-3 mb-2">
          <input
            type="text"
            className="form-control"
            placeholder="🔍 Search by name or description..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="col-md-2 mb-2">
          <input
            type="number"
            className="form-control"
            placeholder="💰 Max Price"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
          />
        </div>

        <div className="col-md-3 mb-2">
          <select
            className="form-select"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">All Categories</option>
            <option value="Men">Men</option>
            <option value="Women">Women</option>
            <option value="Kids">Kids</option>
            {/* ➕ Add more categories as needed */}
          </select>
        </div>

        <div className="col-md-4 mb-2">
          <select
            className="form-select"
            value={sort}
            onChange={(e) => setSort(e.target.value)}
          >
            <option value="">Sort by Price</option>
            <option value="asc">Low to High</option>
            <option value="desc">High to Low</option>
          </select>
        </div>
      </div>

      {/* 🖼 Product Cards */}
      {loading ? (
        <div className="text-center mt-5">Loading products...</div>
      ) : error ? (
        <div className="text-danger text-center mt-5">{error}</div>
      ) : filtered.length > 0 ? (
        <div className="row">
          {filtered.map((product) => (
            <div key={product._id} className="col-md-4 mb-4">
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center text-muted mt-5">No products found</div>
      )}
    </div>
  );
};

export default ProductList;
