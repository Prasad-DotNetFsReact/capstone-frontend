import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, Button, Container } from 'react-bootstrap';
import { FaStar } from 'react-icons/fa'; 
import Slider from 'react-slick';
//import "slick-carousel/slick/slick.css"; 
//import "slick-carousel/slick/slick-theme.css";

import restaurantService from '../services/restaurantService';
import '../css/Rest.css';

const RestaurantSlider = ({ search, selectedCategory }) => {
  const [restaurants, setRestaurants] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    loadRestaurants();
  }, []);

  const loadRestaurants = async () => {
    try {
      const response = await restaurantService.getAllRestaurants();
      setRestaurants(response.data);
    } catch (error) {
      console.error('Error fetching restaurants:', error);
    }
  };

const filteredRestaurants = restaurants
  .filter((restaurant) => {
    return restaurant?.name?.toLowerCase().includes(search.toLowerCase());
  })
  .filter((restaurant) => {
    if (selectedCategory === 'All') return true;
    return restaurant?.category === selectedCategory;
  });


  const navigateToMenu = (restaurant) => {
    navigate(`/menu/${restaurant.id}`, { state: { restaurant } });
  };

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <Container>
      <Slider {...sliderSettings} className="mt-4">
        {filteredRestaurants.map((restaurant) => (
          <div key={restaurant.id} className="slider-item">
            <Card className="restaurant-card">
              <Card.Img
                variant="top"
                src={restaurant.imageUrl}
                alt={restaurant.name}
                style={{ height: '200px', objectFit: 'cover' }}
              />
              <Card.Body>
                <Card.Title>{restaurant.name}</Card.Title>
                <Card.Text>{restaurant.address}</Card.Text>
                <Card.Text>{restaurant.isVeg ? 'Vegetarian' : 'Non-Vegetarian'}</Card.Text>

                {/* Review section */}
                <div className="review-section">
                  <span className="review-text">4.5</span>
                  <FaStar className="text-warning" />
                  <FaStar className="text-warning" />
                  <FaStar className="text-warning" />
                  <FaStar className="text-warning" />
                  <FaStar className="text-muted" />
                </div>

                <Button className="btn-custom" onClick={() => navigateToMenu(restaurant)}>
                  See Menu
                </Button>
              </Card.Body>
            </Card>
          </div>
        ))}
      </Slider>
    </Container>
  );
};

export default RestaurantSlider;
