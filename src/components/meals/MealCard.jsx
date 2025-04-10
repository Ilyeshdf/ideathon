import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiClock, FiMapPin } from 'react-icons/fi';
import { useCart } from '../../contexts/CartContext';

const MealCard = ({ meal }) => {
  const { addToCart } = useCart();
  const [timeLeft, setTimeLeft] = useState('');
  
  // Calculate time left for the deal
  useEffect(() => {
    if (!meal.availableUntil) return;
    
    const calculateTimeLeft = () => {
      const now = new Date();
      const expiryTime = new Date(meal.availableUntil.seconds * 1000);
      const difference = expiryTime - now;
      
      if (difference <= 0) {
        setTimeLeft('Expired');
        return;
      }
      
      const hours = Math.floor(difference / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      
      if (hours > 0) {
        setTimeLeft(`${hours}h ${minutes}m`);
      } else {
        setTimeLeft(`${minutes}m`);
      }
    };
    
    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 60000); // Update every minute
    
    return () => clearInterval(timer);
  }, [meal.availableUntil]);
  
  const discountPercentage = Math.round(
    ((meal.originalPrice - meal.discountedPrice) / meal.originalPrice) * 100
  );
  
  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(meal);
  };
  
  return (
    <Link to={`/meal/${meal.id}`} className="block">
      <div className="card h-full hover:shadow-lg transition-shadow duration-300">
        <div className="relative">
          <img 
            src={meal.imageUrl} 
            alt={meal.name} 
            className="w-full h-48 object-cover rounded-t-xl"
          />
          
          {/* Discount badge */}
          <div className="absolute top-2 left-2 bg-secondary text-white text-sm font-bold px-2 py-1 rounded">
            {discountPercentage}% OFF
          </div>
          
          {/* Time left badge */}
          {timeLeft && (
            <div className="absolute bottom-2 right-2 bg-black bg-opacity-70 text-white text-sm px-2 py-1 rounded flex items-center">
              <FiClock className="mr-1" />
              {timeLeft}
            </div>
          )}
        </div>
        
        <div className="p-4">
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-lg font-bold text-gray-800">{meal.name}</h3>
            <div className="flex items-center">
              <span className="text-gray-400 line-through text-sm mr-1">
                ${meal.originalPrice.toFixed(2)}
              </span>
              <span className="text-secondary font-bold">
                ${meal.discountedPrice.toFixed(2)}
              </span>
            </div>
          </div>
          
          <p className="text-gray-600 text-sm mb-3 line-clamp-2">{meal.description}</p>
          
          <div className="flex justify-between items-center">
            <div className="flex items-center text-gray-500 text-sm">
              <FiMapPin className="mr-1" />
              <span>{meal.restaurant.name}</span>
            </div>
            
            <button 
              onClick={handleAddToCart}
              className="btn btn-sm btn-outline text-sm"
            >
              Add to Cart
            </button>
          </div>
          
          {/* Availability badges */}
          <div className="mt-3 flex flex-wrap gap-1">
            {meal.quantity <= 3 && (
              <span className="text-xs px-2 py-1 bg-red-100 text-red-600 rounded">
                Only {meal.quantity} left
              </span>
            )}
            
            {meal.tags && meal.tags.map((tag, index) => (
              <span 
                key={index}
                className="text-xs px-2 py-1 bg-gray-100 text-gray-600 rounded"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default MealCard; 