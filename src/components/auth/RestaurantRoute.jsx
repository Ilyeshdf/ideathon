import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const RestaurantRoute = ({ children }) => {
  const { currentUser, isRestaurant, loading } = useAuth();
  
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!currentUser) {
    return <Navigate to="/restaurant/login" />;
  }
  
  if (!isRestaurant) {
    return <Navigate to="/" />;
  }
  
  return children;
};

export default RestaurantRoute; 