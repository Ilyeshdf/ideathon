import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { collection, query, where, getDocs, orderBy, startAfter, limit, Timestamp } from 'firebase/firestore';
import { db } from '../firebase';
import MealCard from '../components/meals/MealCard';
import MealFilters from '../components/meals/MealFilters';
import RestaurantMap from '../components/map/RestaurantMap';
import { FiMapPin, FiGrid, FiList, FiRefreshCw } from 'react-icons/fi';

const BrowseMealsPage = () => {
  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    priceRange: [0, 50],
    cuisineType: '',
    dietaryPreferences: []
  });
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'map'
  const [userLocation, setUserLocation] = useState(null);
  const [restaurants, setRestaurants] = useState([]);
  const [lastVisible, setLastVisible] = useState(null);
  const [hasMore, setHasMore] = useState(true);
  
  const location = useLocation();
  
  // Get URL parameters
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const restaurantId = params.get('restaurant');
    
    if (restaurantId) {
      setFilters(prev => ({ ...prev, restaurantId }));
    }
  }, [location]);
  
  // Get user's location
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
        },
        (error) => {
          console.error('Error getting user location:', error);
        }
      );
    }
  }, []);
  
  // Fetch meals from Firestore
  const fetchMeals = async (isLoadMore = false) => {
    try {
      setLoading(true);
      
      // Build the query based on filters
      let mealsQuery = collection(db, 'meals');
      let constraints = [
        where('availableUntil', '>', Timestamp.now()),
        where('quantity', '>', 0),
        orderBy('availableUntil', 'asc')
      ];
      
      if (filters.cuisineType) {
        constraints.push(where('cuisineType', '==', filters.cuisineType));
      }
      
      if (filters.dietaryPreferences.length > 0) {
        constraints.push(where('tags', 'array-contains-any', filters.dietaryPreferences));
      }
      
      if (filters.restaurantId) {
        constraints.push(where('restaurantId', '==', filters.restaurantId));
      }
      
      mealsQuery = query(mealsQuery, ...constraints);
      
      if (isLoadMore && lastVisible) {
        mealsQuery = query(mealsQuery, startAfter(lastVisible), limit(8));
      } else {
        mealsQuery = query(mealsQuery, limit(8));
      }
      
      const querySnapshot = await getDocs(mealsQuery);
      
      // Set the last visible document for pagination
      const lastDoc = querySnapshot.docs[querySnapshot.docs.length - 1];
      setLastVisible(lastDoc);
      setHasMore(querySnapshot.docs.length === 8);
      
      const fetchedMeals = [];
      
      // Process each meal document
      for (const doc of querySnapshot.docs) {
        const mealData = doc.data();
        
        // Filter by price range
        if (mealData.discountedPrice < filters.priceRange[0] || mealData.discountedPrice > filters.priceRange[1]) {
          continue;
        }
        
        // Get restaurant data
        const restaurantDoc = await getDocs(
          query(collection(db, 'restaurants'), where('id', '==', mealData.restaurantId))
        );
        
        if (!restaurantDoc.empty) {
          const restaurantData = restaurantDoc.docs[0].data();
          
          fetchedMeals.push({
            id: doc.id,
            ...mealData,
            restaurant: {
              id: restaurantData.id,
              name: restaurantData.name,
              address: restaurantData.address,
              location: restaurantData.location
            }
          });
        }
      }
      
      if (isLoadMore) {
        setMeals(prev => [...prev, ...fetchedMeals]);
      } else {
        setMeals(fetchedMeals);
      }
      
      // Extract unique restaurants for the map view
      const uniqueRestaurants = Array.from(
        new Map(
          fetchedMeals.map(meal => [meal.restaurant.id, meal.restaurant])
        ).values()
      );
      
      uniqueRestaurants.forEach(restaurant => {
        restaurant.mealsAvailable = fetchedMeals.filter(
          meal => meal.restaurant.id === restaurant.id
        ).length;
      });
      
      setRestaurants(uniqueRestaurants);
      
    } catch (err) {
      console.error('Error fetching meals:', err);
      setError('Failed to load meals. Please try again later.');
    } finally {
      setLoading(false);
    }
  };
  
  // Fetch meals whenever filters change
  useEffect(() => {
    fetchMeals();
  }, [filters]);
  
  const handleFilterChange = (newFilters) => {
    setFilters({ ...filters, ...newFilters });
  };
  
  const handleLoadMore = () => {
    fetchMeals(true);
  };
  
  return (
    <div className="py-8">
      <div className="container-wrapper">
        <h1 className="text-3xl font-bold mb-6">Browse Meals</h1>
        
        {/* Filters */}
        <MealFilters onFilterChange={handleFilterChange} />
        
        {/* View Mode Toggle */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center space-x-4">
            <button 
              onClick={() => setViewMode('grid')}
              className={`flex items-center ${viewMode === 'grid' ? 'text-primary font-medium' : 'text-gray-500'}`}
            >
              <FiGrid className="mr-1" /> Grid View
            </button>
            <button 
              onClick={() => setViewMode('map')}
              className={`flex items-center ${viewMode === 'map' ? 'text-primary font-medium' : 'text-gray-500'}`}
            >
              <FiMapPin className="mr-1" /> Map View
            </button>
          </div>
          
          <button 
            onClick={() => fetchMeals()}
            className="flex items-center text-gray-500 hover:text-primary"
          >
            <FiRefreshCw className="mr-1" /> Refresh
          </button>
        </div>
        
        {/* Map View */}
        {viewMode === 'map' && (
          <div className="mb-8">
            <RestaurantMap 
              restaurants={restaurants} 
              currentPosition={userLocation}
            />
          </div>
        )}
        
        {/* Error Message */}
        {error && (
          <div className="p-4 bg-red-100 text-red-700 rounded-lg mb-6">
            {error}
          </div>
        )}
        
        {/* Loading Skeleton */}
        {loading && meals.length === 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[...Array(8)].map((_, index) => (
              <div key={index} className="bg-white rounded-xl shadow-md overflow-hidden">
                <div className="animate-pulse">
                  <div className="h-48 bg-gray-200 w-full"></div>
                  <div className="p-4">
                    <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/2 mb-4"></div>
                    <div className="h-3 bg-gray-200 rounded w-full mb-2"></div>
                    <div className="h-3 bg-gray-200 rounded w-full mb-2"></div>
                    <div className="flex justify-between items-center mt-4">
                      <div className="h-3 bg-gray-200 rounded w-1/3"></div>
                      <div className="h-8 bg-gray-200 rounded w-1/4"></div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
        
        {/* No Results */}
        {!loading && meals.length === 0 && (
          <div className="text-center py-12">
            <svg className="mx-auto h-16 w-16 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
            </svg>
            <h3 className="mt-4 text-lg font-medium text-gray-900">No meals found</h3>
            <p className="mt-2 text-gray-500">
              We couldn't find any meals matching your criteria. Try adjusting your filters or check back later.
            </p>
            <button 
              onClick={() => {
                setFilters({
                  priceRange: [0, 50],
                  cuisineType: '',
                  dietaryPreferences: []
                });
              }}
              className="mt-4 btn btn-outline"
            >
              Reset Filters
            </button>
          </div>
        )}
        
        {/* Grid View */}
        {viewMode === 'grid' && meals.length > 0 && (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {meals.map(meal => (
                <MealCard key={meal.id} meal={meal} />
              ))}
            </div>
            
            {/* Load More Button */}
            {hasMore && (
              <div className="text-center mt-8">
                <button 
                  onClick={handleLoadMore}
                  className="btn btn-outline"
                  disabled={loading}
                >
                  {loading ? (
                    <span className="flex items-center">
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-primary" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Loading...
                    </span>
                  ) : 'Load More'}
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default BrowseMealsPage; 