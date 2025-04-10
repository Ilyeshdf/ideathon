import React, { useState, useEffect, useCallback } from 'react';
import { GoogleMap, useJsApiLoader, Marker, InfoWindow } from '@react-google-maps/api';
import { FiMapPin, FiNavigation } from 'react-icons/fi';
import { Link } from 'react-router-dom';

const containerStyle = {
  width: '100%',
  height: '400px'
};

const RestaurantMap = ({ restaurants, currentPosition }) => {
  const [map, setMap] = useState(null);
  const [activeMarker, setActiveMarker] = useState(null);
  const [center, setCenter] = useState(
    currentPosition || { lat: 40.7128, lng: -74.0060 } // Default to New York City
  );
  
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY || 'YOUR_API_KEY'
  });
  
  useEffect(() => {
    if (currentPosition) {
      setCenter(currentPosition);
    } else {
      // Try to get user's location if not provided
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            setCenter({
              lat: position.coords.latitude,
              lng: position.coords.longitude
            });
          },
          (error) => {
            console.error('Error getting location:', error);
          }
        );
      }
    }
  }, [currentPosition]);
  
  const onLoad = useCallback(function callback(map) {
    setMap(map);
  }, []);
  
  const onUnmount = useCallback(function callback(map) {
    setMap(null);
  }, []);
  
  const handleMarkerClick = (restaurantId) => {
    setActiveMarker(restaurantId);
  };
  
  const getRestaurantById = (id) => {
    return restaurants.find(restaurant => restaurant.id === id);
  };
  
  if (!isLoaded) {
    return (
      <div className="flex justify-center items-center h-96 bg-gray-100 rounded-lg">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }
  
  return (
    <div className="rounded-lg overflow-hidden shadow-md">
      <div className="bg-white px-4 py-3 border-b border-gray-200 flex justify-between items-center">
        <h3 className="text-lg font-semibold flex items-center">
          <FiMapPin className="text-primary mr-2" />
          Nearby Restaurants
        </h3>
        
        <button 
          onClick={() => {
            if (navigator.geolocation) {
              navigator.geolocation.getCurrentPosition(
                (position) => {
                  setCenter({
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                  });
                }
              );
            }
          }}
          className="flex items-center text-primary text-sm hover:underline"
        >
          <FiNavigation className="mr-1" />
          Center on me
        </button>
      </div>
      
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={14}
        onLoad={onLoad}
        onUnmount={onUnmount}
        options={{
          styles: [
            {
              featureType: 'poi.business',
              stylers: [{ visibility: 'simplified' }]
            }
          ],
          disableDefaultUI: true,
          zoomControl: true,
          fullscreenControl: true
        }}
      >
        {/* User location marker */}
        {currentPosition && (
          <Marker
            position={currentPosition}
            icon={{
              path: 0,
              scale: 7,
              fillColor: '#4285F4',
              fillOpacity: 1,
              strokeColor: '#FFFFFF',
              strokeWeight: 2
            }}
          />
        )}
        
        {/* Restaurant markers */}
        {restaurants.map(restaurant => (
          <Marker
            key={restaurant.id}
            position={{
              lat: restaurant.location.latitude,
              lng: restaurant.location.longitude
            }}
            onClick={() => handleMarkerClick(restaurant.id)}
            icon={{
              url: 'https://maps.google.com/mapfiles/ms/icons/red-dot.png'
            }}
          />
        ))}
        
        {/* Info window for active marker */}
        {activeMarker && (
          <InfoWindow
            position={{
              lat: getRestaurantById(activeMarker).location.latitude,
              lng: getRestaurantById(activeMarker).location.longitude
            }}
            onCloseClick={() => setActiveMarker(null)}
          >
            <div className="p-2 max-w-xs">
              <h3 className="font-bold text-gray-800">{getRestaurantById(activeMarker).name}</h3>
              <p className="text-sm text-gray-600 mb-2">{getRestaurantById(activeMarker).address}</p>
              <div className="flex justify-between items-center">
                <span className="text-xs text-gray-500">
                  {getRestaurantById(activeMarker).mealsAvailable} meals available
                </span>
                <Link 
                  to={`/browse?restaurant=${activeMarker}`}
                  className="text-xs text-primary font-medium hover:underline"
                >
                  View Meals
                </Link>
              </div>
            </div>
          </InfoWindow>
        )}
      </GoogleMap>
    </div>
  );
};

export default RestaurantMap; 