import React from 'react';
import { Link } from 'react-router-dom';

const RestaurantListPage = () => {
  // Mock restaurant data
  const restaurants = [
    {
      id: 1,
      name: 'Urban Cuisine',
      cuisine: 'International',
      rating: 4.5,
      deliveryTime: '20-30 min',
      image: 'https://placehold.co/300x200?text=Urban+Cuisine',
    },
    {
      id: 2,
      name: 'Pasta Paradise',
      cuisine: 'Italian',
      rating: 4.7,
      deliveryTime: '25-35 min',
      image: 'https://placehold.co/300x200?text=Pasta+Paradise',
    },
    {
      id: 3,
      name: 'Spice Garden',
      cuisine: 'Indian',
      rating: 4.3,
      deliveryTime: '30-40 min',
      image: 'https://placehold.co/300x200?text=Spice+Garden',
    },
    {
      id: 4,
      name: 'Sushi Station',
      cuisine: 'Japanese',
      rating: 4.8,
      deliveryTime: '15-25 min',
      image: 'https://placehold.co/300x200?text=Sushi+Station',
    },
  ];

  return (
    <div className="container-wrapper py-8">
      <h1 className="text-3xl font-bold mb-6">Restaurants</h1>
      
      <div className="mb-6">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search restaurants..."
              className="px-4 py-2 border rounded-lg w-full md:w-80"
            />
          </div>
          
          <div className="flex gap-2">
            <select className="px-4 py-2 border rounded-lg">
              <option value="">All Cuisines</option>
              <option value="italian">Italian</option>
              <option value="indian">Indian</option>
              <option value="japanese">Japanese</option>
              <option value="mexican">Mexican</option>
            </select>
            
            <select className="px-4 py-2 border rounded-lg">
              <option value="popularity">Popularity</option>
              <option value="rating">Rating</option>
              <option value="delivery_time">Delivery Time</option>
            </select>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {restaurants.map((restaurant) => (
          <Link 
            to={`/restaurant/${restaurant.id}`} 
            key={restaurant.id}
            className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition duration-300"
          >
            <div className="h-48 overflow-hidden">
              <img
                src={restaurant.image}
                alt={restaurant.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-4">
              <h3 className="text-xl font-semibold">{restaurant.name}</h3>
              <p className="text-gray-600">{restaurant.cuisine}</p>
              <div className="flex items-center justify-between mt-2">
                <div className="flex items-center">
                  <span className="text-yellow-500">★</span>
                  <span className="ml-1">{restaurant.rating}</span>
                </div>
                <div className="text-sm text-gray-500">{restaurant.deliveryTime}</div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default RestaurantListPage; 