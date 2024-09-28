import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, Button, Container, Row, Col } from 'react-bootstrap';
import { FaStar } from 'react-icons/fa'; // For star ratings
import restaurantService from '../services/restaurantService';
import '../css/Rest.css';

const Restaurant = ({ search, selectedCategory }) => {
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
    .filter((restaurant) =>
      restaurant.name.toLowerCase().includes(search.toLowerCase())
    )
    .filter((restaurant) => {
      if (selectedCategory === 'All') return true;
      return restaurant.category === selectedCategory;
    });

  const navigateToMenu = (restaurant) => {
    navigate(`/menu/${restaurant.id}`, { state: { restaurant } });
  };

  return (
    <Container>
      <Row className="mt-4">
        {filteredRestaurants.map((restaurant) => (
          <Col key={restaurant.id} md={4} className="mb-4">
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
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Restaurant;
