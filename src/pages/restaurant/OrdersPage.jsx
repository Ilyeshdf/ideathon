import React, { useState } from 'react';
import { FiCheck, FiX, FiClock, FiUser, FiCalendar, FiDollarSign } from 'react-icons/fi';

const OrdersPage = () => {
  const [filter, setFilter] = useState('all');
  
  // Mock data - in real app, this would come from Firebase
  const orders = [
    {
      id: 'ORD-001',
      customerName: 'John Doe',
      customerEmail: 'john.doe@example.com',
      customerPhone: '(555) 123-4567',
      date: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
      items: [
        { name: 'Pasta Primavera', price: 11.99, quantity: 1 },
        { name: 'Tiramisu', price: 3.99, quantity: 1 }
      ],
      total: 15.98,
      status: 'ready',
      pickupTime: '5:30 PM',
    },
    {
      id: 'ORD-002',
      customerName: 'Sarah Johnson',
      customerEmail: 'sarah.j@example.com',
      customerPhone: '(555) 987-6543',
      date: new Date(Date.now() - 1 * 60 * 60 * 1000), // 1 hour ago
      items: [
        { name: 'Chicken Parmesan', price: 14.99, quantity: 1 }
      ],
      total: 14.99,
      status: 'confirmed',
      pickupTime: '6:00 PM',
    },
    {
      id: 'ORD-003',
      customerName: 'Michael Brown',
      customerEmail: 'michael.b@example.com',
      customerPhone: '(555) 567-8901',
      date: new Date(Date.now() - 24 * 60 * 60 * 1000), // 1 day ago
      items: [
        { name: 'Vegetable Risotto', price: 12.99, quantity: 2 },
        { name: 'Garlic Bread', price: 2.99, quantity: 1 }
      ],
      total: 28.97,
      status: 'completed',
      pickupTime: '7:15 PM',
    },
    {
      id: 'ORD-004',
      customerName: 'Emma Wilson',
      customerEmail: 'emma.w@example.com',
      customerPhone: '(555) 345-6789',
      date: new Date(Date.now() - 30 * 60 * 1000), // 30 minutes ago
      items: [
        { name: 'Beef Tenderloin', price: 21.99, quantity: 1 },
        { name: 'Chocolate Lava Cake', price: 7.99, quantity: 1 }
      ],
      total: 29.98,
      status: 'confirmed',
      pickupTime: '7:45 PM',
    },
  ];
  
  const filteredOrders = orders.filter(order => {
    if (filter === 'all') return true;
    return order.status === filter;
  });
  
  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };
  
  const formatTime = (date) => {
    return new Date(date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };
  
  const handleStatusChange = (orderId, newStatus) => {
    // In a real app, you would update the order status in Firebase
    console.log(`Changing order ${orderId} status to ${newStatus}`);
  };
  
  return (
    <div className="container-wrapper py-8">
      <h1 className="text-3xl font-bold mb-6">Orders</h1>
      
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <div className="flex flex-wrap items-center gap-4">
            <button
              onClick={() => setFilter('all')}
              className={`px-4 py-2 rounded-full text-sm ${
                filter === 'all'
                  ? 'bg-blue-100 text-blue-800 font-medium'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              All Orders
            </button>
            <button
              onClick={() => setFilter('confirmed')}
              className={`px-4 py-2 rounded-full text-sm ${
                filter === 'confirmed'
                  ? 'bg-blue-100 text-blue-800 font-medium'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Confirmed
            </button>
            <button
              onClick={() => setFilter('ready')}
              className={`px-4 py-2 rounded-full text-sm ${
                filter === 'ready'
                  ? 'bg-green-100 text-green-800 font-medium'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Ready for Pickup
            </button>
            <button
              onClick={() => setFilter('completed')}
              className={`px-4 py-2 rounded-full text-sm ${
                filter === 'completed'
                  ? 'bg-gray-500 text-white font-medium'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Completed
            </button>
          </div>
        </div>
        
        <div className="p-6">
          {filteredOrders.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-500">No orders match your current filter</p>
            </div>
          ) : (
            <div className="space-y-6">
              {filteredOrders.map(order => (
                <div key={order.id} className="border rounded-lg overflow-hidden">
                  <div className="bg-gray-50 p-4 flex flex-wrap justify-between items-center">
                    <div>
                      <div className="flex items-center space-x-4">
                        <h3 className="font-semibold text-gray-800">{order.id}</h3>
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          order.status === 'ready' 
                            ? 'bg-green-100 text-green-800' 
                            : order.status === 'confirmed'
                              ? 'bg-blue-100 text-blue-800'
                              : 'bg-gray-100 text-gray-800'
                        }`}>
                          {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                        </span>
                      </div>
                      <div className="flex items-center mt-1 text-sm text-gray-600">
                        <FiCalendar className="mr-1" />
                        <span className="mr-4">{formatDate(order.date)}</span>
                        <FiClock className="mr-1" />
                        <span>Pickup: {order.pickupTime}</span>
                      </div>
                    </div>
                    
                    <div className="mt-2 md:mt-0 flex space-x-2">
                      {order.status === 'confirmed' && (
                        <button 
                          onClick={() => handleStatusChange(order.id, 'ready')}
                          className="px-3 py-1 bg-green-500 text-white rounded flex items-center text-sm hover:bg-green-600"
                        >
                          <FiCheck className="mr-1" />
                          Mark Ready
                        </button>
                      )}
                      {order.status === 'ready' && (
                        <button 
                          onClick={() => handleStatusChange(order.id, 'completed')}
                          className="px-3 py-1 bg-gray-500 text-white rounded flex items-center text-sm hover:bg-gray-600"
                        >
                          <FiCheck className="mr-1" />
                          Complete
                        </button>
                      )}
                      {order.status !== 'completed' && (
                        <button 
                          onClick={() => handleStatusChange(order.id, 'cancelled')}
                          className="px-3 py-1 bg-red-100 text-red-600 rounded flex items-center text-sm hover:bg-red-200"
                        >
                          <FiX className="mr-1" />
                          Cancel
                        </button>
                      )}
                    </div>
                  </div>
                  
                  <div className="p-4">
                    <div className="flex flex-col md:flex-row md:justify-between gap-4">
                      <div className="mb-4 md:mb-0">
                        <h4 className="text-sm font-medium text-gray-500 mb-2">Customer Information</h4>
                        <div className="flex items-start text-gray-800">
                          <FiUser className="mt-1 mr-2" />
                          <div>
                            <div className="font-medium">{order.customerName}</div>
                            <div className="text-sm text-gray-600">{order.customerEmail}</div>
                            <div className="text-sm text-gray-600">{order.customerPhone}</div>
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="text-sm font-medium text-gray-500 mb-2">Order Summary</h4>
                        <div className="space-y-1">
                          {order.items.map((item, index) => (
                            <div key={index} className="flex justify-between text-sm">
                              <span>
                                {item.quantity} × {item.name}
                              </span>
                              <span>${(item.price * item.quantity).toFixed(2)}</span>
                            </div>
                          ))}
                          <div className="flex justify-between font-medium pt-2 border-t">
                            <span>Total</span>
                            <span>${order.total.toFixed(2)}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrdersPage; 