import React, { useEffect, useState } from 'react';
import { Table, Button, Container, Modal, Form, Tabs, Tab } from 'react-bootstrap';
import restaurantService from '../services/restaurantService';
import menuService from '../services/menuService';
import orderService from '../services/orderService';
import '../css/RestaurantList.css';

import MenuList from '../menuitem/MenuList';
import AddMenu from '../menuitem/AddMenu';
import OrderList from '../order/OrderList';
const RestaurantList = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);
  const [menuItems, setMenuItems] = useState([]);
  const [orders, setOrders] = useState([]);
  const [showEditModal, setShowEditModal] = useState(false);
  const [formValues, setFormValues] = useState({
    name: '',
    address: '',
    imageUrl: '',
    isVeg: true,
  });

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

  const handleRestaurantClick = async (restaurant) => {
    setSelectedRestaurant(restaurant);
    try {
      const menuResponse = await menuService.getMenuByRestaurant(restaurant.id);
      setMenuItems(menuResponse.data);
      const orderResponse = await orderService.getOrdersByRestaurant(restaurant.id);
      setOrders(orderResponse.data);
    } catch (error) {
      console.error('Error fetching details:', error);
    }
  };

  const handleEdit = (restaurant) => {
    setSelectedRestaurant(restaurant);
    setFormValues({
      name: restaurant.name,
      address: restaurant.address,
      imageUrl: restaurant.imageUrl,
      isVeg: restaurant.isVeg,
    });
    setShowEditModal(true);
  };

  const handleDelete = async (restaurantId) => {
    if (window.confirm('Are you sure you want to delete this restaurant?')) {
      try {
        await restaurantService.deleteRestaurant(restaurantId);
        alert('Restaurant deleted successfully');
        loadRestaurants();
      } catch (error) {
        console.error('Error deleting restaurant:', error);
      }
    }
  };

  const handleChange = (e) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      const updatedRestaurant = {
        ...selectedRestaurant,
        ...formValues,
      };
      await restaurantService.updateRestaurant(selectedRestaurant.id, updatedRestaurant);
      alert('Restaurant updated successfully');
      setShowEditModal(false);
      loadRestaurants();
    } catch (error) {
      console.error('Error updating restaurant:', error);
    }
  };

  return (
    <Container className="restaurant-list-container mt-5">
      <h2 className="text-center mb-4">Restaurant List</h2>
      <Table striped bordered hover responsive className="restaurant-table">
        <thead>
          <tr>
            <th>Sr.No</th>
            <th>Image</th>
            <th>Name</th>
            <th>Address</th>
            <th>Type</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {restaurants.map((restaurant, index) => (
            <tr key={restaurant.id} onClick={() => handleRestaurantClick(restaurant)}>
              <td>{index + 1}</td>
              <td>
                <img
                  src={restaurant.imageUrl}
                  alt={restaurant.name}
                  className="restaurant-image"
                />
              </td>
              <td>{restaurant.name}</td>
              <td>{restaurant.address}</td>
              <td>{restaurant.isVeg ? 'Vegetarian' : 'Non-Vegetarian'}</td>
              <td>
                <Button
                  variant="outline-primary"
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation(); // Prevent triggering restaurant click
                    handleEdit(restaurant);
                  }}
                  className="me-2"
                >
                  Edit
                </Button>
                <Button
                  variant="outline-danger"
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation(); // Prevent triggering restaurant click
                    handleDelete(restaurant.id);
                  }}
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Restaurant Details and Options */}
      {selectedRestaurant && (
        <div className="restaurant-details mt-4">
          <h3>{selectedRestaurant.name}</h3>
          <p>{selectedRestaurant.address}</p>
          <Tabs defaultActiveKey="menu" id="restaurant-details-tabs" className="mb-3">
            <Tab eventKey="menu" title="Menu Items">
              <h4>Menu Items</h4>
             
              <AddMenu restaurantId={selectedRestaurant.id} />

             
              <MenuList restaurantId={selectedRestaurant.id} />
            </Tab>

            <Tab eventKey="orders" title="Orders">
              <h4>Orders</h4>
              <OrderList restaurantId={selectedRestaurant.id} />
            </Tab>
          </Tabs>

        </div>
      )}

      {/* Edit Modal */}
      <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Restaurant</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formName" className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter restaurant name"
                name="name"
                value={formValues.name}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group controlId="formAddress" className="mb-3">
              <Form.Label>Address</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter restaurant address"
                name="address"
                value={formValues.address}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group controlId="formImageUrl" className="mb-3">
              <Form.Label>Image URL</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter image URL"
                name="imageUrl"
                value={formValues.imageUrl}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group controlId="formIsVeg" className="mb-3">
              <Form.Label>Type</Form.Label>
              <Form.Control
                as="select"
                name="isVeg"
                value={formValues.isVeg}
                onChange={handleChange}
              >
                <option value={true}>Vegetarian</option>
                <option value={false}>Non-Vegetarian</option>
              </Form.Control>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowEditModal(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default RestaurantList;
