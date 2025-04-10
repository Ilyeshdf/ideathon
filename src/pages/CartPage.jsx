import React from 'react';
import { Link } from 'react-router-dom';
import { FiTrash2, FiMinus, FiPlus, FiArrowRight, FiShoppingCart } from 'react-icons/fi';
import { useCart } from '../contexts/CartContext';

const CartPage = () => {
  const { 
    cartItems, 
    removeFromCart, 
    updateQuantity, 
    clearCart, 
    cartTotal 
  } = useCart();

  return (
    <div className="container-wrapper py-8">
      <h1 className="text-3xl font-bold mb-6">Your Cart</h1>
      
      {cartItems.length === 0 ? (
        <div className="bg-white rounded-xl shadow-md overflow-hidden p-8 text-center">
          <div className="flex justify-center mb-4">
            <FiShoppingCart className="text-gray-400 text-6xl" />
          </div>
          <h2 className="text-2xl font-semibold text-gray-700 mb-2">Your cart is empty</h2>
          <p className="text-gray-500 mb-6">
            Looks like you haven't added any meals to your cart yet.
          </p>
          <Link to="/browse" className="btn btn-primary inline-flex items-center">
            Browse Meals <FiArrowRight className="ml-2" />
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              <div className="p-6 border-b border-gray-200 flex justify-between items-center">
                <h2 className="text-xl font-semibold text-gray-800">
                  {cartItems.length} {cartItems.length === 1 ? 'Item' : 'Items'}
                </h2>
                <button 
                  onClick={clearCart}
                  className="text-gray-500 hover:text-red-500 text-sm flex items-center"
                >
                  <FiTrash2 className="mr-1" /> Clear Cart
                </button>
              </div>
              
              <div className="divide-y divide-gray-200">
                {cartItems.map(item => (
                  <div key={item.id} className="p-6">
                    <div className="flex flex-col md:flex-row">
                      <div className="md:w-24 md:h-24 h-32 mb-4 md:mb-0 mr-6 flex-shrink-0">
                        <img 
                          src={item.imageUrl} 
                          alt={item.name} 
                          className="w-full h-full object-cover rounded-lg"
                        />
                      </div>
                      
                      <div className="flex-grow">
                        <h3 className="text-lg font-semibold text-gray-800 mb-1">{item.name}</h3>
                        <p className="text-gray-500 text-sm mb-3">
                          {item.restaurant?.name || 'Restaurant'}
                        </p>
                        
                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
                          <div className="flex items-center mb-3 sm:mb-0">
                            <button 
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="p-1 border border-gray-300 rounded-l-md hover:bg-gray-100"
                            >
                              <FiMinus size={16} />
                            </button>
                            <div className="px-3 py-1 border-t border-b border-gray-300 text-center min-w-[40px]">
                              {item.quantity}
                            </div>
                            <button 
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="p-1 border border-gray-300 rounded-r-md hover:bg-gray-100"
                              disabled={item.quantity >= item.maxQuantity}
                            >
                              <FiPlus size={16} />
                            </button>
                          </div>
                          
                          <div className="flex items-center justify-between">
                            <div className="text-right mr-4">
                              <div className="text-gray-400 line-through text-sm">
                                ${(item.originalPrice * item.quantity).toFixed(2)}
                              </div>
                              <div className="text-secondary font-semibold">
                                ${(item.discountedPrice * item.quantity).toFixed(2)}
                              </div>
                            </div>
                            
                            <button 
                              onClick={() => removeFromCart(item.id)}
                              className="text-gray-400 hover:text-red-500"
                            >
                              <FiTrash2 size={18} />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-md overflow-hidden p-6 sticky top-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-6">Order Summary</h2>
              
              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span>${cartTotal.toFixed(2)}</span>
                </div>
                
                <div className="flex justify-between text-gray-600">
                  <span>Service Fee</span>
                  <span>$0.99</span>
                </div>
                
                <div className="border-t border-gray-200 pt-4 flex justify-between font-semibold text-gray-800">
                  <span>Total</span>
                  <span>${(cartTotal + 0.99).toFixed(2)}</span>
                </div>
              </div>
              
              <Link 
                to="/checkout" 
                className="btn btn-primary w-full flex justify-center items-center"
              >
                Proceed to Checkout <FiArrowRight className="ml-2" />
              </Link>
              
              <div className="mt-4 text-xs text-gray-500 text-center">
                By proceeding, you agree to our Terms of Service and Privacy Policy
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage; 