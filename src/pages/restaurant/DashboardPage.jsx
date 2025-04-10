import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiPlusCircle, FiEdit, FiTrash2, FiTag, FiClock, FiList } from 'react-icons/fi';
import { useAuth } from '../../contexts/AuthContext';

const DashboardPage = () => {
  const { userData } = useAuth();
  const [activeTab, setActiveTab] = useState('meals');
  
  // Mock data - in a real app, this would come from Firebase
  const meals = [
    {
      id: 1,
      name: 'Pasta Primavera',
      originalPrice: 18.99,
      discountedPrice: 11.99,
      quantity: 5,
      availableUntil: new Date(Date.now() + 4 * 60 * 60 * 1000), // 4 hours from now
      imageUrl: 'https://placehold.co/300x200?text=Pasta+Primavera',
    },
    {
      id: 2,
      name: 'Chicken Parmesan',
      originalPrice: 21.99,
      discountedPrice: 14.99,
      quantity: 3,
      availableUntil: new Date(Date.now() + 3 * 60 * 60 * 1000), // 3 hours from now
      imageUrl: 'https://placehold.co/300x200?text=Chicken+Parmesan',
    },
  ];
  
  const orders = [
    {
      id: 'ORD-001',
      customerName: 'John Doe',
      date: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
      items: ['Pasta Primavera', 'Tiramisu'],
      total: 15.98,
      status: 'ready',
      pickupTime: '5:30 PM',
    },
    {
      id: 'ORD-002',
      customerName: 'Sarah Johnson',
      date: new Date(Date.now() - 1 * 60 * 60 * 1000), // 1 hour ago
      items: ['Chicken Parmesan'],
      total: 14.99,
      status: 'confirmed',
      pickupTime: '6:00 PM',
    },
  ];
  
  const formatTime = (date) => {
    return new Date(date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="container-wrapper py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Restaurant Dashboard</h1>
        <Link to="/restaurant/add-meal" className="btn btn-primary flex items-center">
          <FiPlusCircle className="mr-2" />
          Add New Meal
        </Link>
      </div>
      
      <div className="bg-white rounded-xl shadow-md overflow-hidden mb-8">
        <div className="p-6 border-b border-gray-200">
          <div className="flex flex-col md:flex-row md:items-center">
            <div className="mb-4 md:mb-0 md:mr-6">
              <h2 className="text-2xl font-semibold">{userData?.restaurantName || 'Your Restaurant'}</h2>
              <p className="text-gray-600">{userData?.cuisine || 'Various Cuisines'}</p>
            </div>
            <div className="flex-grow"></div>
            <div className="flex flex-col text-right">
              <span className="text-gray-600">Today's Meals: {meals.length}</span>
              <span className="text-gray-600">Pending Orders: {orders.filter(o => o.status !== 'completed').length}</span>
            </div>
          </div>
        </div>
        
        <div className="border-b">
          <div className="flex">
            <button
              className={`px-6 py-3 font-medium text-sm ${
                activeTab === 'meals' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-600'
              }`}
              onClick={() => setActiveTab('meals')}
            >
              <FiTag className="inline mr-2" />
              Active Meals
            </button>
            <button
              className={`px-6 py-3 font-medium text-sm ${
                activeTab === 'orders' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-600'
              }`}
              onClick={() => setActiveTab('orders')}
            >
              <FiList className="inline mr-2" />
              Current Orders
            </button>
          </div>
        </div>
        
        <div className="p-6">
          {activeTab === 'meals' ? (
            <div>
              {meals.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-gray-500 mb-4">No active meals yet</p>
                  <Link to="/restaurant/add-meal" className="btn btn-outline">
                    Add Your First Meal
                  </Link>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="min-w-full">
                    <thead>
                      <tr className="bg-gray-50">
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Meal
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Price
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Quantity
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Available Until
                        </th>
                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {meals.map((meal) => (
                        <tr key={meal.id}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="h-10 w-10 flex-shrink-0">
                                <img
                                  className="h-10 w-10 rounded-md object-cover"
                                  src={meal.imageUrl}
                                  alt={meal.name}
                                />
                              </div>
                              <div className="ml-4">
                                <div className="font-medium text-gray-900">{meal.name}</div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-gray-500 line-through text-sm">
                              ${meal.originalPrice.toFixed(2)}
                            </div>
                            <div className="text-gray-900 font-medium">
                              ${meal.discountedPrice.toFixed(2)}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`${
                              meal.quantity <= 2 ? 'text-red-600' : 'text-gray-900'
                            }`}>
                              {meal.quantity} left
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center text-gray-500">
                              <FiClock className="mr-1" />
                              {formatTime(meal.availableUntil)}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right">
                            <button className="text-blue-600 hover:text-blue-800 mr-3">
                              <FiEdit size={18} />
                            </button>
                            <button className="text-red-600 hover:text-red-800">
                              <FiTrash2 size={18} />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          ) : (
            <div>
              {orders.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-gray-500">No current orders</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="min-w-full">
                    <thead>
                      <tr className="bg-gray-50">
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Order ID
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Customer
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Items
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Pickup Time
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Status
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {orders.map((order) => (
                        <tr key={order.id}>
                          <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">
                            {order.id}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-gray-900">
                            {order.customerName}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-gray-900">
                            {order.items.join(', ')}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-gray-900">
                            {order.pickupTime}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`px-2 py-1 rounded-full text-xs ${
                              order.status === 'ready' 
                                ? 'bg-green-100 text-green-800' 
                                : order.status === 'confirmed'
                                  ? 'bg-blue-100 text-blue-800'
                                  : 'bg-gray-100 text-gray-800'
                            }`}>
                              {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DashboardPage; 