import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from 'react-toastify';

const CartContext = createContext();

export function useCart() {
  return useContext(CartContext);
}

export function CartProvider({ children }) {
  // Initialize cart from localStorage if available
  const [cartItems, setCartItems] = useState(() => {
    const savedCart = localStorage.getItem('yumsave_cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });
  
  const [pickupTime, setPickupTime] = useState(null);
  const [cartTotal, setCartTotal] = useState(0);
  
  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('yumsave_cart', JSON.stringify(cartItems));
    
    // Calculate cart total
    const total = cartItems.reduce((sum, item) => {
      return sum + (item.discountedPrice * item.quantity);
    }, 0);
    
    setCartTotal(total);
  }, [cartItems]);
  
  // Add item to cart
  const addToCart = (meal, quantity = 1) => {
    // Check if item already exists in cart
    const existingItemIndex = cartItems.findIndex(item => item.id === meal.id);
    
    if (existingItemIndex !== -1) {
      // Update quantity of existing item
      const updatedCart = [...cartItems];
      updatedCart[existingItemIndex].quantity += quantity;
      setCartItems(updatedCart);
      toast.info(`Updated ${meal.name} quantity in cart`);
    } else {
      // Add new item to cart
      setCartItems([...cartItems, {
        ...meal,
        quantity
      }]);
      toast.success(`Added ${meal.name} to cart`);
    }
  };
  
  // Remove item from cart
  const removeFromCart = (mealId) => {
    setCartItems(cartItems.filter(item => item.id !== mealId));
    toast.info('Item removed from cart');
  };
  
  // Update item quantity
  const updateQuantity = (mealId, newQuantity) => {
    if (newQuantity < 1) {
      removeFromCart(mealId);
      return;
    }
    
    const updatedCart = cartItems.map(item => 
      item.id === mealId ? { ...item, quantity: newQuantity } : item
    );
    
    setCartItems(updatedCart);
  };
  
  // Clear cart
  const clearCart = () => {
    setCartItems([]);
    setPickupTime(null);
    toast.info('Cart cleared');
  };
  
  // Set pickup time
  const setPickup = (time) => {
    setPickupTime(time);
  };
  
  const getItemCount = () => {
    return cartItems.reduce((count, item) => count + item.quantity, 0);
  };
  
  const value = {
    cartItems,
    pickupTime,
    cartTotal,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    setPickup,
    getItemCount,
    itemCount: getItemCount(),
    hasItems: cartItems.length > 0
  };
  
  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
} 