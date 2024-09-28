import React, { useState } from 'react';
import { Form, Button, Container, Card } from 'react-bootstrap';
import menuService from '../services/menuService';
import { useNavigate } from 'react-router-dom';
import '../css/AddMenu.css'; 

const AddMenu = () => {
  const [formValues, setFormValues] = useState({
    name: '',
    description: '',
    price: '',
    imageUrl: '',
    restaurantId: '',
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await menuService.addMenuItem(formValues);
      alert('Menu item added successfully!');
      navigate('/menu-list');
    } 
    
    catch (error) {
      console.error('Error adding menu item:', error);
      alert('Failed to add menu item. Please try again.');
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center vh-130">
      <Card className="add-menu-card p-4">
        <h6 className="text-center mb-4">Add New Menu Item</h6>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="name" className="mb-3">
            <Form.Label>Name</Form.Label>
            <Form.Control 
              type="text" 
              name="name" 
              value={formValues.name} 
              onChange={handleChange} 
              placeholder="Enter menu item name"
              required 
            />
          </Form.Group>

          <Form.Group controlId="description" className="mb-3">
            <Form.Label>Description</Form.Label>
            <Form.Control 
              type="text" 
              name="description" 
              value={formValues.description} 
              onChange={handleChange} 
              placeholder="Enter description"
              required 
            />
          </Form.Group>

          <Form.Group controlId="price" className="mb-3">
            <Form.Label>Price</Form.Label>
            <Form.Control 
              type="number" 
              name="price" 
              value={formValues.price} 
              onChange={handleChange} 
              placeholder="Enter price"
              required 
            />
          </Form.Group>

          <Form.Group controlId="imageUrl" className="mb-3">
            <Form.Label>Image URL</Form.Label>
            <Form.Control 
              type="text" 
              name="imageUrl" 
              value={formValues.imageUrl} 
              onChange={handleChange} 
              placeholder="Enter image URL"
              required 
            />
          </Form.Group>

          <Form.Group controlId="restaurantId" className="mb-3">
            <Form.Label>Restaurant ID</Form.Label>
            <Form.Control 
              type="number" 
              name="restaurantId" 
              value={formValues.restaurantId} 
              onChange={handleChange} 
              placeholder="Enter restaurant ID"
              required 
            />
          </Form.Group>

          <Button type="submit" className="custom-btn w-100">
            Add Menu Item
          </Button>
        </Form>
      </Card>
    </Container>
  );
};

export default AddMenu;
