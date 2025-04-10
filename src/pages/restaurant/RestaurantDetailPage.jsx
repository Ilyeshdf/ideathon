import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';

const RestaurantDetailPage = () => {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState('menu');
  const [cartItems, setCartItems] = useState([]);

  // Mock restaurant data (in a real app, you would fetch this based on id)
  const restaurant = {
    id: parseInt(id),
    name: 'Urban Cuisine',
    cuisine: 'International',
    rating: 4.5,
    ratings: 240,
    deliveryTime: '20-30 min',
    deliveryFee: '$2.99',
    minOrder: '$10.00',
    address: '123 Main St, Anytown, USA',
    phone: '(555) 123-4567',
    hours: '10:00 AM - 10:00 PM',
    image: 'https://placehold.co/800x300?text=Urban+Cuisine',
    description: 'Urban Cuisine offers a diverse menu featuring dishes from around the world. From Italian pasta to Asian stir-fry, our chefs combine global flavors with locally sourced ingredients to create unforgettable dining experiences.',
  };

  // Mock menu data
  const menuCategories = [
    {
      id: 1,
      name: 'Appetizers',
      items: [
        {
          id: 101,
          name: 'Crispy Calamari',
          description: 'Tender calamari, lightly breaded and fried, served with lemon aioli',
          price: 12.99,
          image: 'https://placehold.co/200x150?text=Calamari',
          popular: true,
        },
        {
          id: 102,
          name: 'Bruschetta',
          description: 'Toasted baguette topped with tomato, basil, and fresh mozzarella',
          price: 9.99,
          image: 'https://placehold.co/200x150?text=Bruschetta',
          popular: false,
        },
      ],
    },
    {
      id: 2,
      name: 'Main Courses',
      items: [
        {
          id: 201,
          name: 'Grilled Salmon',
          description: 'Fresh Atlantic salmon with lemon butter sauce and seasonal vegetables',
          price: 24.99,
          image: 'https://placehold.co/200x150?text=Salmon',
          popular: true,
        },
        {
          id: 202,
          name: 'Beef Tenderloin',
          description: 'Grass-fed beef tenderloin steak with roasted potatoes and mushroom sauce',
          price: 29.99,
          image: 'https://placehold.co/200x150?text=Beef',
          popular: true,
        },
        {
          id: 203,
          name: 'Vegetable Risotto',
          description: 'Creamy arborio rice with seasonal vegetables and parmesan',
          price: 18.99,
          image: 'https://placehold.co/200x150?text=Risotto',
          popular: false,
        },
      ],
    },
    {
      id: 3,
      name: 'Desserts',
      items: [
        {
          id: 301,
          name: 'Tiramisu',
          description: 'Classic Italian dessert with layers of coffee-soaked ladyfingers and mascarpone cream',
          price: 8.99,
          image: 'https://placehold.co/200x150?text=Tiramisu',
          popular: true,
        },
        {
          id: 302,
          name: 'Chocolate Lava Cake',
          description: 'Warm chocolate cake with a molten center, served with vanilla ice cream',
          price: 9.99,
          image: 'https://placehold.co/200x150?text=Chocolate+Cake',
          popular: false,
        },
      ],
    },
  ];

  // Mock reviews
  const reviews = [
    {
      id: 1,
      user: 'Sarah L.',
      rating: 5,
      date: '2 weeks ago',
      comment: 'Absolutely love this place! The food is always fresh and delivery is prompt.',
    },
    {
      id: 2,
      user: 'Michael T.',
      rating: 4,
      date: '1 month ago',
      comment: 'Great food and reasonable prices. Would recommend the Beef Tenderloin.',
    },
    {
      id: 3,
      user: 'Jennifer K.',
      rating: 5,
      date: '2 months ago',
      comment: 'Best international cuisine in town. The Grilled Salmon is my favorite!',
    },
  ];

  const addToCart = (item) => {
    setCartItems([...cartItems, item]);
  };

  return (
    <div className="container-wrapper py-8">
      <div className="mb-8">
        <Link to="/restaurants" className="text-blue-600 hover:underline mb-4 inline-block">
          ← Back to Restaurants
        </Link>
        
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="h-64 overflow-hidden">
            <img
              src={restaurant.image}
              alt={restaurant.name}
              className="w-full h-full object-cover"
            />
          </div>
          
          <div className="p-6">
            <div className="flex justify-between items-start flex-wrap">
              <div>
                <h1 className="text-3xl font-bold">{restaurant.name}</h1>
                <p className="text-gray-600">{restaurant.cuisine}</p>
                
                <div className="flex items-center mt-2">
                  <span className="text-yellow-500 font-bold">{restaurant.rating}</span>
                  <span className="text-yellow-500 ml-1">★</span>
                  <span className="text-gray-500 ml-1">({restaurant.ratings} ratings)</span>
                  <span className="mx-2">•</span>
                  <span className="text-gray-600">{restaurant.deliveryTime}</span>
                </div>
              </div>
              
              <div className="bg-blue-50 p-4 rounded-lg mt-4 md:mt-0">
                <div className="text-sm text-gray-600 mb-1">Delivery Fee: {restaurant.deliveryFee}</div>
                <div className="text-sm text-gray-600 mb-1">Min Order: {restaurant.minOrder}</div>
                <button className="bg-blue-600 text-white px-4 py-2 rounded-lg mt-2 text-sm">
                  Order Now
                </button>
              </div>
            </div>
            
            <p className="mt-4 text-gray-700">{restaurant.description}</p>
            
            <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div>
                <span className="font-semibold">Address:</span> {restaurant.address}
              </div>
              <div>
                <span className="font-semibold">Phone:</span> {restaurant.phone}
              </div>
              <div>
                <span className="font-semibold">Hours:</span> {restaurant.hours}
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <div className="border-b">
          <div className="flex">
            <button
              className={`px-6 py-3 font-medium text-sm ${
                activeTab === 'menu' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-600'
              }`}
              onClick={() => setActiveTab('menu')}
            >
              Menu
            </button>
            <button
              className={`px-6 py-3 font-medium text-sm ${
                activeTab === 'reviews' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-600'
              }`}
              onClick={() => setActiveTab('reviews')}
            >
              Reviews
            </button>
            <button
              className={`px-6 py-3 font-medium text-sm ${
                activeTab === 'info' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-600'
              }`}
              onClick={() => setActiveTab('info')}
            >
              Info
            </button>
          </div>
        </div>
        
        <div className="p-6">
          {activeTab === 'menu' && (
            <div>
              {menuCategories.map((category) => (
                <div key={category.id} className="mb-8">
                  <h2 className="text-xl font-semibold mb-4">{category.name}</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {category.items.map((item) => (
                      <div 
                        key={item.id} 
                        className="flex border rounded-lg overflow-hidden hover:shadow-md transition-shadow"
                      >
                        <div className="w-1/3">
                          <img 
                            src={item.image} 
                            alt={item.name} 
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="w-2/3 p-4">
                          <div className="flex justify-between">
                            <h3 className="font-medium">
                              {item.name}
                              {item.popular && (
                                <span className="ml-2 text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded">
                                  Popular
                                </span>
                              )}
                            </h3>
                            <span className="font-semibold">${item.price.toFixed(2)}</span>
                          </div>
                          <p className="text-gray-600 text-sm mt-1">{item.description}</p>
                          <button 
                            className="mt-2 text-blue-600 text-sm font-medium hover:text-blue-800"
                            onClick={() => addToCart(item)}
                          >
                            Add to cart
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
          
          {activeTab === 'reviews' && (
            <div>
              <div className="flex items-center mb-6">
                <div className="text-3xl font-bold text-yellow-500 mr-2">{restaurant.rating}</div>
                <div className="text-yellow-500 text-2xl">★</div>
                <div className="ml-2 text-gray-600">Based on {restaurant.ratings} reviews</div>
              </div>
              
              <div className="space-y-6">
                {reviews.map((review) => (
                  <div key={review.id} className="border-b pb-4">
                    <div className="flex justify-between mb-2">
                      <div className="font-medium">{review.user}</div>
                      <div className="text-gray-500 text-sm">{review.date}</div>
                    </div>
                    <div className="flex items-center mb-2">
                      {[...Array(5)].map((_, i) => (
                        <span key={i} className={i < review.rating ? "text-yellow-500" : "text-gray-300"}>
                          ★
                        </span>
                      ))}
                    </div>
                    <p className="text-gray-700">{review.comment}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {activeTab === 'info' && (
            <div>
              <h2 className="text-xl font-semibold mb-4">Restaurant Information</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-medium mb-2">Address & Hours</h3>
                  <p className="text-gray-700 mb-1">{restaurant.address}</p>
                  <p className="text-gray-700">Open: {restaurant.hours}</p>
                </div>
                
                <div>
                  <h3 className="font-medium mb-2">Contact</h3>
                  <p className="text-gray-700">{restaurant.phone}</p>
                </div>
              </div>
              
              <div className="mt-6">
                <h3 className="font-medium mb-2">About</h3>
                <p className="text-gray-700">{restaurant.description}</p>
              </div>
            </div>
          )}
        </div>
      </div>
      
      {cartItems.length > 0 && (
        <div className="fixed bottom-0 right-0 m-4 bg-white rounded-lg shadow-lg p-4 w-72">
          <h3 className="font-semibold mb-2">Your Cart ({cartItems.length} items)</h3>
          <ul className="max-h-60 overflow-auto mb-4">
            {cartItems.map((item, index) => (
              <li key={index} className="border-b py-2 last:border-0">
                <div className="flex justify-between">
                  <span>{item.name}</span>
                  <span>${item.price.toFixed(2)}</span>
                </div>
              </li>
            ))}
          </ul>
          <div className="font-semibold flex justify-between mb-4">
            <span>Total:</span>
            <span>
              ${cartItems.reduce((total, item) => total + item.price, 0).toFixed(2)}
            </span>
          </div>
          <button className="w-full bg-blue-600 text-white py-2 rounded-lg">
            Checkout
          </button>
        </div>
      )}
    </div>
  );
};

export default RestaurantDetailPage; 