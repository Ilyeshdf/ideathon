import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiClock, FiCheck, FiAlertCircle } from 'react-icons/fi';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';
import { collection, addDoc, serverTimestamp, doc, updateDoc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { toast } from 'react-toastify';

// Load Stripe.js
const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY || 'pk_test_12345');

const CheckoutForm = () => {
  const { cartItems, cartTotal, clearCart, pickupTime, setPickup } = useCart();
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const stripe = useStripe();
  const elements = useElements();
  
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState(null);
  const [succeeded, setSucceeded] = useState(false);
  const [availableTimeSlots, setAvailableTimeSlots] = useState([]);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState(null);
  
  // Generate time slots for pickup
  useEffect(() => {
    const generateTimeSlots = () => {
      const now = new Date();
      const slots = [];
      
      // Start from the next hour
      let hour = now.getHours() + 1;
      const minute = now.getMinutes() > 30 ? 30 : 0;
      
      // Generate slots for the next 6 hours
      for (let i = 0; i < 6; i++) {
        if (hour > 23) break;
        
        const slotTime = new Date();
        slotTime.setHours(hour, minute === 0 ? 0 : 30, 0, 0);
        
        slots.push({
          id: `${hour}-${minute}`,
          time: slotTime,
          label: slotTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        });
        
        // Move to next slot (30 min increment)
        if (minute === 0) {
          minute = 30;
        } else {
          minute = 0;
          hour++;
        }
      }
      
      return slots;
    };
    
    setAvailableTimeSlots(generateTimeSlots());
  }, []);
  
  const handleSelectTimeSlot = (slot) => {
    setSelectedTimeSlot(slot);
    setPickup(slot.time);
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!stripe || !elements) {
      return;
    }
    
    if (!selectedTimeSlot) {
      setError('Please select a pickup time');
      return;
    }
    
    setProcessing(true);
    
    try {
      // Create payment method using the card element
      const { error, paymentMethod } = await stripe.createPaymentMethod({
        type: 'card',
        card: elements.getElement(CardElement),
        billing_details: {
          email: currentUser.email,
          name: currentUser.displayName,
        },
      });
      
      if (error) {
        setError(`Payment failed: ${error.message}`);
        setProcessing(false);
        return;
      }
      
      // Create order in Firestore
      const orderRef = await addDoc(collection(db, 'orders'), {
        userId: currentUser.uid,
        userEmail: currentUser.email,
        userName: currentUser.displayName,
        items: cartItems.map(item => ({
          id: item.id,
          name: item.name,
          quantity: item.quantity,
          price: item.discountedPrice,
          restaurantId: item.restaurantId
        })),
        restaurantId: cartItems[0].restaurantId, // Assuming all items are from the same restaurant
        status: 'pending',
        total: parseFloat((cartTotal + 0.99).toFixed(2)),
        pickupTime: selectedTimeSlot.time,
        paymentMethodId: paymentMethod.id,
        createdAt: serverTimestamp()
      });
      
      // Update user's orders
      const userRef = doc(db, 'users', currentUser.uid);
      const userDoc = await getDoc(userRef);
      
      if (userDoc.exists()) {
        const userData = userDoc.data();
        const orders = userData.orders || [];
        orders.push({
          id: orderRef.id,
          total: parseFloat((cartTotal + 0.99).toFixed(2)),
          createdAt: new Date(),
          status: 'pending'
        });
        
        await updateDoc(userRef, { orders });
      }
      
      // In a real app, you would process the payment with Stripe here
      
      setSucceeded(true);
      clearCart();
      
      // Redirect to confirmation page after 2 seconds
      setTimeout(() => {
        navigate('/profile', { state: { orderSuccess: true, orderId: orderRef.id } });
      }, 2000);
      
    } catch (err) {
      console.error('Error processing order:', err);
      setError('An error occurred while processing your order. Please try again.');
    } finally {
      setProcessing(false);
    }
  };
  
  // Show success message if payment succeeded
  if (succeeded) {
    return (
      <div className="bg-green-50 p-6 rounded-lg text-center">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <FiCheck className="text-green-500 text-2xl" />
        </div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Payment Successful!</h2>
        <p className="text-gray-600 mb-6">
          Your order has been placed successfully. Redirecting to your profile...
        </p>
      </div>
    );
  }
  
  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Pickup Time Selection */}
      <div>
        <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
          <FiClock className="mr-2" /> Select Pickup Time
        </h3>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {availableTimeSlots.map(slot => (
            <button
              key={slot.id}
              type="button"
              onClick={() => handleSelectTimeSlot(slot)}
              className={`p-3 rounded-lg border text-center transition-colors ${
                selectedTimeSlot?.id === slot.id
                  ? 'bg-primary text-white border-primary'
                  : 'border-gray-300 hover:border-primary text-gray-700'
              }`}
            >
              {slot.label}
            </button>
          ))}
        </div>
      </div>
      
      {/* Payment Details */}
      <div>
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Payment Details</h3>
        
        <div className="border border-gray-300 rounded-lg p-4 mb-4">
          <CardElement 
            options={{
              style: {
                base: {
                  fontSize: '16px',
                  color: '#424770',
                  '::placeholder': {
                    color: '#aab7c4',
                  },
                },
                invalid: {
                  color: '#9e2146',
                },
              },
            }}
          />
        </div>
        
        {error && (
          <div className="p-3 mb-4 bg-red-50 text-red-600 rounded-md flex items-center">
            <FiAlertCircle className="mr-2" /> {error}
          </div>
        )}
        
        <button
          type="submit"
          disabled={processing || !stripe || !selectedTimeSlot}
          className="btn btn-primary w-full"
        >
          {processing ? (
            <span className="flex items-center justify-center">
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Processing...
            </span>
          ) : `Pay ${(cartTotal + 0.99).toFixed(2)}`}
        </button>
        
        <p className="mt-2 text-xs text-gray-500 text-center">
          This is a test payment. No actual charges will be made.
        </p>
      </div>
    </form>
  );
};

const CheckoutPage = () => {
  const { cartItems, cartTotal } = useCart();
  const navigate = useNavigate();
  
  // Redirect to cart if cart is empty
  useEffect(() => {
    if (cartItems.length === 0) {
      navigate('/cart');
    }
  }, [cartItems, navigate]);
  
  if (cartItems.length === 0) {
    return null;
  }
  
  return (
    <div className="container-wrapper py-8">
      <h1 className="text-3xl font-bold mb-6">Checkout</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-md overflow-hidden p-6">
            <Elements stripe={stripePromise}>
              <CheckoutForm />
            </Elements>
          </div>
        </div>
        
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl shadow-md overflow-hidden p-6 sticky top-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-6">Order Summary</h2>
            
            <div className="space-y-4 mb-6">
              {/* Order Items */}
              <div className="space-y-3">
                {cartItems.map(item => (
                  <div key={item.id} className="flex justify-between">
                    <div className="flex-1">
                      <span className="text-gray-700">
                        {item.quantity} × {item.name}
                      </span>
                    </div>
                    <div className="text-gray-700 font-medium">
                      ${(item.discountedPrice * item.quantity).toFixed(2)}
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="border-t border-gray-200 pt-4 space-y-3">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span>${cartTotal.toFixed(2)}</span>
                </div>
                
                <div className="flex justify-between text-gray-600">
                  <span>Service Fee</span>
                  <span>$0.99</span>
                </div>
                
                <div className="border-t border-gray-200 pt-3 flex justify-between font-semibold text-gray-800">
                  <span>Total</span>
                  <span>${(cartTotal + 0.99).toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage; 