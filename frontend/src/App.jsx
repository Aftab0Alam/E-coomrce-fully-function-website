import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import CartPage from './pages/CartPage';
import ProductList from './components/ProductList';
import AddProduct from './pages/AddProduct';

import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import AdminAddProduct from './pages/AdminAddProduct';
import AdminOrders from './pages/AdminOrders';
import CheckoutPage from './pages/CheckoutPage'; // ⬅️ Add this
import MyOrders from './pages/MyOrders';
import ProductDetails from './pages/ProductDetails';
import UserDashboard from './pages/UserDashboard';
import AdminProductList from './pages/AdminProductList';
import AdminProductEdit from './pages/AdminProductEdit';
import UserProfile from './pages/UserProfile';



const App = () => {
  const user = JSON.parse(localStorage.getItem('user'));

  const AdminRoute = ({ children }) => {
    if (!user || !user.isAdmin) {
      return <Navigate to="/admin/login" />;
    }
    return children;
  };

  return (
    <>
      <Navbar />

      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<HomePage />} />
        <Route path="/products" element={<ProductList />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/my-orders" element={<MyOrders />} />
        <Route path="/products/:id" element={<ProductDetails />} />
        <Route path="/dashboard" element={<UserDashboard />} />
        <Route path="/admin/products" element={<AdminProductList />} />
        <Route path="/admin/products/edit/:id" element={<AdminProductEdit />} />
         <Route path="/profile" element={<UserProfile />} />

        {/* Normal user - Add product page (optional, remove if admin-only) */}
        <Route path="/add-product" element={<AddProduct />} />

        {/* Admin Routes */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route
          path="/admin/dashboard"
          element={<AdminRoute><AdminDashboard /></AdminRoute>}
        />
        <Route
          path="/admin/add-product"
          element={<AdminRoute><AdminAddProduct /></AdminRoute>}
        />
        <Route
          path="/admin/orders"
          element={<AdminRoute><AdminOrders /></AdminRoute>}
        />
      </Routes>
    </>
  );
};

export default App;
