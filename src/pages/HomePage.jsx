import React from 'react';
import { Link } from 'react-router-dom';
import { FiArrowRight, FiMapPin, FiClock, FiDollarSign, FiCoffee } from 'react-icons/fi';

const HomePage = () => {
  return (
    <>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary to-secondary text-white py-16">
        <div className="container-wrapper">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Save Food, Save Money, Eat Well
              </h1>
              <p className="text-lg mb-8 text-white text-opacity-90">
                YumSave connects you with local restaurants offering discounted meals that would otherwise go to waste. Enjoy quality food at a fraction of the price.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link 
                  to="/browse" 
                  className="btn bg-white text-primary hover:bg-opacity-90 font-bold py-3 px-6 rounded-lg text-center"
                >
                  Browse Meals
                </Link>
                <Link 
                  to="/signup" 
                  className="btn border-2 border-white text-white hover:bg-white hover:bg-opacity-10 font-bold py-3 px-6 rounded-lg text-center"
                >
                  Sign Up
                </Link>
              </div>
            </div>
            <div className="hidden md:block">
              <div className="relative">
                <img 
                  src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80" 
                  alt="Delicious food" 
                  className="rounded-lg shadow-xl"
                />
                <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-lg shadow-lg">
                  <div className="flex items-center text-gray-800">
                    <div className="bg-primary bg-opacity-10 p-2 rounded-full mr-3">
                      <FiDollarSign className="text-primary text-xl" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Average Savings</p>
                      <p className="font-bold">50% Off</p>
                    </div>
                  </div>
                </div>
                <div className="absolute -top-6 -right-6 bg-white p-4 rounded-lg shadow-lg">
                  <div className="flex items-center text-gray-800">
                    <div className="bg-secondary bg-opacity-10 p-2 rounded-full mr-3">
                      <FiClock className="text-secondary text-xl" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Ready In</p>
                      <p className="font-bold">15 Minutes</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 bg-white">
        <div className="container-wrapper">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">How YumSave Works</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Our platform makes it easy to find great food at discounted prices while helping reduce food waste.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6 rounded-xl bg-gray-50">
              <div className="bg-primary bg-opacity-10 w-16 h-16 flex items-center justify-center rounded-full mx-auto mb-4">
                <FiMapPin className="text-primary text-2xl" />
              </div>
              <h3 className="text-xl font-bold mb-2">Find Nearby Meals</h3>
              <p className="text-gray-600">
                Browse discounted meals from restaurants in your area that would otherwise go to waste.
              </p>
            </div>

            <div className="text-center p-6 rounded-xl bg-gray-50">
              <div className="bg-primary bg-opacity-10 w-16 h-16 flex items-center justify-center rounded-full mx-auto mb-4">
                <FiClock className="text-primary text-2xl" />
              </div>
              <h3 className="text-xl font-bold mb-2">Reserve & Pay</h3>
              <p className="text-gray-600">
                Reserve your meal at a discounted price and pay securely through our platform.
              </p>
            </div>

            <div className="text-center p-6 rounded-xl bg-gray-50">
              <div className="bg-primary bg-opacity-10 w-16 h-16 flex items-center justify-center rounded-full mx-auto mb-4">
                <FiCoffee className="text-primary text-2xl" />
              </div>
              <h3 className="text-xl font-bold mb-2">Pick Up & Enjoy</h3>
              <p className="text-gray-600">
                Pick up your meal at the restaurant during the designated time and enjoy your delicious food.
              </p>
            </div>
          </div>

          <div className="text-center mt-12">
            <Link to="/browse" className="btn btn-primary inline-flex items-center">
              Browse Available Meals <FiArrowRight className="ml-2" />
            </Link>
          </div>
        </div>
      </section>

      {/* Join as Restaurant CTA */}
      <section className="py-16 bg-gray-100">
        <div className="container-wrapper">
          <div className="bg-white rounded-2xl shadow-md overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-2">
              <div className="p-8 md:p-12 flex flex-col justify-center">
                <h2 className="text-3xl font-bold mb-4">Restaurant Partner?</h2>
                <p className="text-gray-600 mb-6">
                  Join YumSave to reduce food waste, reach new customers, and generate additional revenue from surplus food.
                </p>
                <ul className="mb-6 space-y-2">
                  <li className="flex items-center text-gray-700">
                    <span className="bg-green-100 text-green-700 rounded-full p-1 mr-2">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                    </span>
                    Reduce food waste and its environmental impact
                  </li>
                  <li className="flex items-center text-gray-700">
                    <span className="bg-green-100 text-green-700 rounded-full p-1 mr-2">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                    </span>
                    Generate additional revenue from surplus food
                  </li>
                  <li className="flex items-center text-gray-700">
                    <span className="bg-green-100 text-green-700 rounded-full p-1 mr-2">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                    </span>
                    Reach new customers and increase brand awareness
                  </li>
                </ul>
                <Link 
                  to="/restaurant/signup" 
                  className="btn btn-primary inline-flex items-center self-start"
                >
                  Partner with Us <FiArrowRight className="ml-2" />
                </Link>
              </div>
              <div className="hidden md:block">
                <img 
                  src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80" 
                  alt="Restaurant" 
                  className="object-cover h-full w-full"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default HomePage; 