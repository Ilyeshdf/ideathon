import React, { useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

// Components
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';

// Pages
import HomePage from './pages/HomePage';
import BrowseMealsPage from './pages/BrowseMealsPage';
import MealDetailsPage from './pages/MealDetailsPage';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import ProfilePage from './pages/ProfilePage';
import LoginPage from './pages/auth/LoginPage';
import SignupPage from './pages/auth/SignupPage';
import NotFoundPage from './pages/NotFoundPage';

// Restaurant Pages
import RestaurantLoginPage from './pages/restaurant/LoginPage';
import RestaurantDashboardPage from './pages/restaurant/DashboardPage';
import RestaurantAddMealPage from './pages/restaurant/AddMealPage';
import RestaurantOrdersPage from './pages/restaurant/OrdersPage';
import RestaurantListPage from './pages/restaurant/RestaurantListPage';
import RestaurantDetailPage from './pages/restaurant/RestaurantDetailPage';

// Context & Auth
import { AuthProvider } from './contexts/AuthContext';
import { CartProvider } from './contexts/CartContext';
import { LanguageProvider } from './contexts/LanguageContext';
import PrivateRoute from './components/auth/PrivateRoute';
import RestaurantRoute from './components/auth/RestaurantRoute';

function App() {
  // Load any necessary app data on initial load
  useEffect(() => {
    // Initialization code here
  }, []);

  return (
    <AuthProvider>
      <CartProvider>
        <LanguageProvider>
          <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-grow">
              <Routes>
                {/* Public Routes */}
                <Route path="/" element={<HomePage />} />
                <Route path="/browse" element={<BrowseMealsPage />} />
                <Route path="/meal/:id" element={<MealDetailsPage />} />
                <Route path="/cart" element={<CartPage />} />
                <Route path="/restaurants" element={<RestaurantListPage />} />
                <Route path="/restaurant/:id" element={<RestaurantDetailPage />} />
                
                {/* Auth Routes */}
                <Route path="/login" element={<LoginPage />} />
                <Route path="/signup" element={<SignupPage />} />
                
                {/* Protected User Routes */}
                <Route path="/checkout" element={
                  <PrivateRoute>
                    <CheckoutPage />
                  </PrivateRoute>
                } />
                <Route path="/profile" element={
                  <PrivateRoute>
                    <ProfilePage />
                  </PrivateRoute>
                } />
                
                {/* Restaurant Routes */}
                <Route path="/restaurant/login" element={<RestaurantLoginPage />} />
                <Route path="/restaurant/dashboard" element={
                  <RestaurantRoute>
                    <RestaurantDashboardPage />
                  </RestaurantRoute>
                } />
                <Route path="/restaurant/add-meal" element={
                  <RestaurantRoute>
                    <RestaurantAddMealPage />
                  </RestaurantRoute>
                } />
                <Route path="/restaurant/orders" element={
                  <RestaurantRoute>
                    <RestaurantOrdersPage />
                  </RestaurantRoute>
                } />
                
                {/* 404 and redirects */}
                <Route path="/404" element={<NotFoundPage />} />
                <Route path="*" element={<Navigate to="/404" replace />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </LanguageProvider>
      </CartProvider>
    </AuthProvider>
  );
}

export default App; 