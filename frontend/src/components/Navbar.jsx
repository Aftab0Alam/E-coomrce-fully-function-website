import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const Navbar = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));
  const { cartItems } = useCart();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  const profileImageURL = user?.profileImage
    ? `http://localhost:5000/uploads/${user.profileImage}`
    : 'https://cdn-icons-png.flaticon.com/512/149/149071.png';

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top shadow">
      <div className="container">
        <Link className="navbar-brand fw-bold" to="/">Clothify</Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto align-items-center">
            <li className="nav-item">
              <Link className="nav-link" to="/">Home</Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/products">Shop</Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/cart">
                Cart
                {totalItems > 0 && (
                  <span className="badge bg-success ms-1">{totalItems}</span>
                )}
              </Link>
            </li>

            {!user && (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/login">Login</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/register">Register</Link>
                </li>
              </>
            )}

            {/* ✅ Admin Dropdown */}
            {user?.isAdmin && (
              <li className="nav-item dropdown">
                <span
                  className="nav-link dropdown-toggle d-flex align-items-center"
                  id="adminDropdown"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                  style={{ cursor: 'pointer' }}
                >
                  <img
                    src={profileImageURL}
                    alt="Admin"
                    className="rounded-circle me-2"
                    style={{ width: 35, height: 35, objectFit: 'cover' }}
                  />
                  {user.name}
                </span>
                <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="adminDropdown">
                  <li><Link className="dropdown-item" to="/admin/dashboard">Dashboard</Link></li>
                  <li><Link className="dropdown-item" to="/admin/products">All Products</Link></li>
                  <li><Link className="dropdown-item" to="/admin/add-product">Add Product</Link></li>
                  <li><Link className="dropdown-item" to="/admin/orders">Orders</Link></li>
                  <li><hr className="dropdown-divider" /></li>
                  <li>
                    <button className="dropdown-item text-danger" onClick={handleLogout}>
                      Logout
                    </button>
                  </li>
                </ul>
              </li>
            )}

            {/* ✅ Regular User Dropdown */}
            {user && !user.isAdmin && (
              <li className="nav-item dropdown">
                <span
                  className="nav-link dropdown-toggle d-flex align-items-center"
                  id="userDropdown"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                  style={{ cursor: 'pointer' }}
                >
                  <img
                    src={profileImageURL}
                    alt="User"
                    className="rounded-circle me-2"
                    style={{ width: 35, height: 35, objectFit: 'cover' }}
                  />
                  {user.name}
                </span>
                <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="userDropdown">
                  <li><Link className="dropdown-item" to="/profile">My Profile</Link></li>
                  <li><Link className="dropdown-item" to="/my-orders">My Orders</Link></li>
                  <li><Link className="dropdown-item" to="/dashboard">My Dashboard</Link></li>
                  <li><hr className="dropdown-divider" /></li>
                  <li>
                    <button className="dropdown-item text-danger" onClick={handleLogout}>
                      Logout
                    </button>
                  </li>
                </ul>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
