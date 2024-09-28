import React, { useState } from 'react';
import { Form, Button, Card, Container } from 'react-bootstrap';
import restaurantService from '../services/restaurantService';
import '../css/AddRestaurant.css';

const AddRestaurant = () => {
  const [restaurant, setRestaurant] = useState({
    name: '',
    address: '',
    imageUrl: '',
    isVeg: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setRestaurant((prevRestaurant) => ({
      ...prevRestaurant,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await restaurantService.addRestaurant(restaurant);
      alert('Restaurant added successfully!');
      setRestaurant({ name: '', address: '', imageUrl: '', isVeg: false });
    } catch (error) {
      console.error('Error adding restaurant:', error);
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center vh-100">
      <Card className="add-restaurant-card shadow p-4">
        <h4 className="text-center mb-4">Add New Restaurant</h4>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="restaurantName" className="mb-3">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              name="name"
              value={restaurant.name}
              onChange={handleChange}
              placeholder="Enter restaurant name"
              required
            />
          </Form.Group>

          <Form.Group controlId="restaurantAddress" className="mb-3">
            <Form.Label>Address</Form.Label>
            <Form.Control
              type="text"
              name="address"
              value={restaurant.address}
              onChange={handleChange}
              placeholder="Enter restaurant address"
              required
            />
          </Form.Group>

          <Form.Group controlId="restaurantImageUrl" className="mb-3">
            <Form.Label>Image URL</Form.Label>
            <Form.Control
              type="text"
              name="imageUrl"
              value={restaurant.imageUrl}
              onChange={handleChange}
              placeholder="Enter restaurant image URL"
              required
            />
          </Form.Group>

          <Form.Group controlId="restaurantIsVeg" className="mb-3">
            <Form.Check
              type="checkbox"
              name="isVeg"
              checked={restaurant.isVeg}
              onChange={handleChange}
              label="Vegetarian"
            />
          </Form.Group>

          <Button type="submit" className="btn-custom w-100">
            Add Restaurant
          </Button>
        </Form>
      </Card>
    </Container>
  );
};

export default AddRestaurant;
