import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { useCart } from '../contexts/CartContext';
import { FiClock, FiMapPin, FiTag, FiMinus, FiPlus, FiAlertCircle, FiArrowLeft } from 'react-icons/fi';

const MealDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  
  const [meal, setMeal] = useState(null);
  const [restaurant, setRestaurant] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [timeLeft, setTimeLeft] = useState('');
  
  // Fetch meal details from Firestore
  useEffect(() => {
    const fetchMealDetails = async () => {
      try {
        setLoading(true);
        
        const mealDoc = await getDoc(doc(db, 'meals', id));
        
        if (!mealDoc.exists()) {
          setError('Meal not found');
          return;
        }
        
        const mealData = mealDoc.data();
        setMeal({ id: mealDoc.id, ...mealData });
        
        // Fetch restaurant details
        const restaurantDoc = await getDoc(doc(db, 'restaurants', mealData.restaurantId));
        
        if (restaurantDoc.exists()) {
          setRestaurant({ id: restaurantDoc.id, ...restaurantDoc.data() });
        }
        
      } catch (err) {
        console.error('Error fetching meal details:', err);
        setError('Failed to load meal details. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    
    fetchMealDetails();
  }, [id]);
  
  // Calculate time left for the deal
  useEffect(() => {
    if (!meal?.availableUntil) return;
    
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
  }, [meal]);
  
  const handleAddToCart = () => {
    if (meal) {
      addToCart(meal, quantity);
      navigate('/cart');
    }
  };
  
  const handleQuantityChange = (newQuantity) => {
    if (newQuantity < 1) return;
    if (meal && newQuantity > meal.quantity) return;
    setQuantity(newQuantity);
  };
  
  if (loading) {
    return (
      <div className="container-wrapper py-12">
        <div className="animate-pulse max-w-4xl mx-auto">
          <div className="h-72 bg-gray-200 rounded-lg w-full mb-6"></div>
          <div className="h-8 bg-gray-200 rounded w-2/3 mb-4"></div>
          <div className="h-6 bg-gray-200 rounded w-1/2 mb-6"></div>
          <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-3/4 mb-6"></div>
          <div className="grid grid-cols-2 gap-4">
            <div className="h-48 bg-gray-200 rounded"></div>
            <div className="h-48 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    );
  }
  
  if (error || !meal) {
    return (
      <div className="container-wrapper py-12">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-red-50 p-6 rounded-lg">
            <FiAlertCircle className="mx-auto text-red-500 text-4xl mb-4" />
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Error Loading Meal</h2>
            <p className="text-gray-600 mb-6">{error || 'Meal could not be loaded'}</p>
            <button 
              onClick={() => navigate(-1)}
              className="btn btn-primary"
            >
              <FiArrowLeft className="mr-2" /> Go Back
            </button>
          </div>
        </div>
      </div>
    );
  }
  
  const discountPercentage = Math.round(
    ((meal.originalPrice - meal.discountedPrice) / meal.originalPrice) * 100
  );
  
  const isAvailable = meal.quantity > 0 && timeLeft !== 'Expired';
  
  return (
    <div className="container-wrapper py-8">
      <div className="max-w-5xl mx-auto">
        {/* Back button */}
        <button 
          onClick={() => navigate(-1)}
          className="flex items-center text-gray-600 hover:text-primary mb-6"
        >
          <FiArrowLeft className="mr-2" /> Back to Browse
        </button>
        
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2">
            {/* Image */}
            <div className="relative">
              <img 
                src={meal.imageUrl} 
                alt={meal.name} 
                className="w-full h-full object-cover"
              />
              
              {/* Discount badge */}
              <div className="absolute top-4 left-4 bg-secondary text-white text-sm font-bold px-3 py-1 rounded-full">
                {discountPercentage}% OFF
              </div>
              
              {/* Time left badge */}
              {timeLeft && (
                <div className="absolute bottom-4 right-4 bg-black bg-opacity-70 text-white text-sm px-3 py-1 rounded-full flex items-center">
                  <FiClock className="mr-1" />
                  {timeLeft}
                </div>
              )}
            </div>
            
            {/* Details */}
            <div className="p-6 md:p-8">
              <h1 className="text-3xl font-bold text-gray-800 mb-2">{meal.name}</h1>
              
              {restaurant && (
                <div className="flex items-center text-gray-600 mb-4">
                  <FiMapPin className="mr-1" />
                  <span>{restaurant.name}</span>
                </div>
              )}
              
              <div className="mb-6">
                <p className="text-gray-600 mb-4">{meal.description}</p>
                
                {/* Price */}
                <div className="flex items-center mb-4">
                  <span className="text-gray-400 line-through text-xl mr-2">
                    ${meal.originalPrice.toFixed(2)}
                  </span>
                  <span className="text-secondary font-bold text-2xl">
                    ${meal.discountedPrice.toFixed(2)}
                  </span>
                </div>
                
                {/* Quantity */}
                {isAvailable ? (
                  <div className="mb-4">
                    <div className="flex items-center">
                      <button 
                        onClick={() => handleQuantityChange(quantity - 1)}
                        className="p-2 border border-gray-300 rounded-l-lg hover:bg-gray-100"
                        disabled={quantity <= 1}
                      >
                        <FiMinus />
                      </button>
                      <div className="px-4 py-2 border-t border-b border-gray-300 text-center min-w-[60px]">
                        {quantity}
                      </div>
                      <button 
                        onClick={() => handleQuantityChange(quantity + 1)}
                        className="p-2 border border-gray-300 rounded-r-lg hover:bg-gray-100"
                        disabled={quantity >= meal.quantity}
                      >
                        <FiPlus />
                      </button>
                      
                      <span className="ml-4 text-sm text-gray-500">
                        {meal.quantity} available
                      </span>
                    </div>
                  </div>
                ) : (
                  <div className="p-3 mb-4 bg-red-50 text-red-600 rounded-md flex items-center">
                    <FiAlertCircle className="mr-2" />
                    {timeLeft === 'Expired' ? 'This offer has expired' : 'Out of stock'}
                  </div>
                )}
                
                {/* Add to Cart */}
                <button 
                  onClick={handleAddToCart}
                  className="btn btn-primary w-full"
                  disabled={!isAvailable}
                >
                  Add to Cart - ${(meal.discountedPrice * quantity).toFixed(2)}
                </button>
                
                {/* Tags */}
                {meal.tags && meal.tags.length > 0 && (
                  <div className="mt-6">
                    <div className="flex items-center text-gray-600 mb-2">
                      <FiTag className="mr-1" />
                      <span>Tags:</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {meal.tags.map((tag, index) => (
                        <span 
                          key={index}
                          className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-sm"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
          
          {/* Additional Details */}
          <div className="p-6 md:p-8 border-t border-gray-200">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h2 className="text-xl font-bold mb-4">Ingredients</h2>
                {meal.ingredients ? (
                  <ul className="list-disc pl-5 space-y-1 text-gray-600">
                    {meal.ingredients.map((ingredient, index) => (
                      <li key={index}>{ingredient}</li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-gray-500">No ingredients information available</p>
                )}
              </div>
              
              <div>
                <h2 className="text-xl font-bold mb-4">Allergens</h2>
                {meal.allergens && meal.allergens.length > 0 ? (
                  <ul className="list-disc pl-5 space-y-1 text-gray-600">
                    {meal.allergens.map((allergen, index) => (
                      <li key={index}>{allergen}</li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-gray-500">No allergen information available</p>
                )}
              </div>
            </div>
          </div>
          
          {/* Restaurant Details */}
          {restaurant && (
            <div className="p-6 md:p-8 border-t border-gray-200">
              <h2 className="text-xl font-bold mb-4">Pickup Location</h2>
              <div className="flex items-start">
                <FiMapPin className="text-gray-500 mt-1 mr-3" />
                <div>
                  <h3 className="font-semibold text-gray-800">{restaurant.name}</h3>
                  <p className="text-gray-600">{restaurant.address}</p>
                  {restaurant.openingHours && (
                    <p className="text-gray-500 mt-1">
                      Open: {restaurant.openingHours}
                    </p>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MealDetailsPage; 