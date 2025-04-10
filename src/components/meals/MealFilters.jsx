import React, { useState } from 'react';
import { FiFilter, FiX } from 'react-icons/fi';

const MealFilters = ({ onFilterChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [priceRange, setPriceRange] = useState([0, 50]);
  const [cuisineType, setCuisineType] = useState('');
  const [dietaryPreferences, setDietaryPreferences] = useState([]);
  
  const dietaryOptions = [
    { id: 'vegetarian', label: 'Vegetarian' },
    { id: 'vegan', label: 'Vegan' },
    { id: 'gluten-free', label: 'Gluten-Free' },
    { id: 'halal', label: 'Halal' },
    { id: 'kosher', label: 'Kosher' },
    { id: 'dairy-free', label: 'Dairy-Free' },
    { id: 'nut-free', label: 'Nut-Free' }
  ];
  
  const cuisineOptions = [
    { id: '', label: 'All Cuisines' },
    { id: 'italian', label: 'Italian' },
    { id: 'chinese', label: 'Chinese' },
    { id: 'mexican', label: 'Mexican' },
    { id: 'indian', label: 'Indian' },
    { id: 'japanese', label: 'Japanese' },
    { id: 'thai', label: 'Thai' },
    { id: 'mediterranean', label: 'Mediterranean' },
    { id: 'american', label: 'American' }
  ];
  
  const handlePriceChange = (e) => {
    const value = parseInt(e.target.value, 10);
    setPriceRange([0, value]);
  };
  
  const handleCuisineChange = (e) => {
    setCuisineType(e.target.value);
  };
  
  const handleDietaryChange = (id) => {
    setDietaryPreferences(prev => {
      if (prev.includes(id)) {
        return prev.filter(item => item !== id);
      } else {
        return [...prev, id];
      }
    });
  };
  
  const applyFilters = () => {
    onFilterChange({
      priceRange,
      cuisineType,
      dietaryPreferences
    });
  };
  
  const resetFilters = () => {
    setPriceRange([0, 50]);
    setCuisineType('');
    setDietaryPreferences([]);
    onFilterChange({
      priceRange: [0, 50],
      cuisineType: '',
      dietaryPreferences: []
    });
  };
  
  const toggleFilters = () => {
    setIsOpen(!isOpen);
  };
  
  return (
    <div className="mb-6">
      <div className="flex justify-between items-center mb-4">
        <button 
          onClick={toggleFilters}
          className="flex items-center btn btn-outline text-sm"
        >
          <FiFilter className="mr-2" />
          {isOpen ? 'Hide Filters' : 'Show Filters'}
        </button>
        
        {dietaryPreferences.length > 0 || cuisineType || priceRange[1] < 50 ? (
          <button 
            onClick={resetFilters}
            className="text-gray-500 text-sm hover:text-secondary flex items-center"
          >
            <FiX className="mr-1" />
            Reset Filters
          </button>
        ) : null}
      </div>
      
      {isOpen && (
        <div className="bg-white p-4 rounded-lg shadow-md mb-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Price Range */}
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Price Range
              </label>
              <div className="mb-2 flex justify-between">
                <span className="text-gray-600 text-sm">$0</span>
                <span className="text-gray-600 text-sm">${priceRange[1]}</span>
              </div>
              <input
                type="range"
                min="1"
                max="50"
                value={priceRange[1]}
                onChange={handlePriceChange}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary"
              />
            </div>
            
            {/* Cuisine Type */}
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Cuisine Type
              </label>
              <select
                value={cuisineType}
                onChange={handleCuisineChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              >
                {cuisineOptions.map(option => (
                  <option key={option.id} value={option.id}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
            
            {/* Dietary Preferences */}
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Dietary Preferences
              </label>
              <div className="flex flex-wrap gap-2">
                {dietaryOptions.map(option => (
                  <button
                    key={option.id}
                    type="button"
                    onClick={() => handleDietaryChange(option.id)}
                    className={`px-3 py-1 rounded-full text-sm transition-colors ${
                      dietaryPreferences.includes(option.id)
                        ? 'bg-primary text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
          
          <div className="flex justify-end mt-4">
            <button
              onClick={applyFilters}
              className="btn btn-primary"
            >
              Apply Filters
            </button>
          </div>
        </div>
      )}
      
      {/* Applied Filters Tags */}
      {(dietaryPreferences.length > 0 || cuisineType) && (
        <div className="flex flex-wrap gap-2 mt-2">
          {cuisineType && (
            <div className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm flex items-center">
              {cuisineOptions.find(option => option.id === cuisineType)?.label}
              <button 
                onClick={() => {
                  setCuisineType('');
                  applyFilters();
                }}
                className="ml-2 text-gray-500 hover:text-gray-700"
              >
                <FiX size={14} />
              </button>
            </div>
          )}
          
          {dietaryPreferences.map(pref => (
            <div 
              key={pref}
              className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm flex items-center"
            >
              {dietaryOptions.find(option => option.id === pref)?.label}
              <button 
                onClick={() => {
                  handleDietaryChange(pref);
                  applyFilters();
                }}
                className="ml-2 text-gray-500 hover:text-gray-700"
              >
                <FiX size={14} />
              </button>
            </div>
          ))}
          
          {priceRange[1] < 50 && (
            <div className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm flex items-center">
              Under ${priceRange[1]}
              <button 
                onClick={() => {
                  setPriceRange([0, 50]);
                  applyFilters();
                }}
                className="ml-2 text-gray-500 hover:text-gray-700"
              >
                <FiX size={14} />
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default MealFilters; 