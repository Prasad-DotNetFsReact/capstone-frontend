import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import restaurantService from '../services/restaurantService';

const RestaurantDetails = () => {
  const { id } = useParams();
  const [restaurant, setRestaurant] = useState(null);

  useEffect(() => {
    const fetchRestaurant = async () => {
      try {
        const response = await restaurantService.getRestaurantById(id);
        setRestaurant(response.data);
      } catch (error) {
        console.error('Error fetching restaurant details:', error);
      }
    };

    fetchRestaurant();
  }, [id]);

  if (!restaurant) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mt-5">
      <h2>{restaurant.name}</h2>
      <p><strong>Address:</strong> {restaurant.address}</p>
      <p><strong>Type:</strong> {restaurant.isVeg ? 'Vegetarian' : 'Non-Vegetarian'}</p>
      <img src={restaurant.imageUrl} alt={restaurant.name} className="restaurant-details-image" />
    </div>
  );
};

export default RestaurantDetails;
