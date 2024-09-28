import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AdminDashboard from './components/user/AdminDashboard';
import CustomerDashboard from './components/user/CustomerDashboard';
import Login from './components/Login';
import 'bootstrap/dist/css/bootstrap.css';
import ProtectedRoute from './components/auth/ProtectedRoute';
import Menu from './components/menuitem/Menu';
import DeliveryPartner from './components/user/DeliveryPartner';

import Cart from './components/context/Cart'; 
import { CartProvider } from './components/context/CartContext';
import LandingPage from './components/LandingPage';
import SignUp from './components/Signup';


const App = () => {

  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  }, []);

  return (
    <CartProvider>
    <Router>
      <Routes>
       <Route path="/" element ={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route
            path="/customer-dashboard"
            element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <CustomerDashboard />
            </ProtectedRoute>
            }
          />        
        <Route
            path="/admin-dashboard"
            element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <AdminDashboard />
            </ProtectedRoute>
            }
          />
          <Route
            path="/deliverypartner-dashboard"
            element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <DeliveryPartner />
            </ProtectedRoute>
            }
          />
          <Route
          path="/menu/:id"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <Menu />
            </ProtectedRoute>
          }
        />
        <Route
            path="/cart"
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <Cart />
              </ProtectedRoute>
            }
          />
      </Routes>
    </Router>
  </CartProvider>
  );
};

export default App;


