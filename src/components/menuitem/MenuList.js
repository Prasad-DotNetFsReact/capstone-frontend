import React, { useEffect, useState } from 'react';
import { Table, Button, Modal, Form, Container } from 'react-bootstrap';
import menuService from '../services/menuService';
import '../css/MenuList.css'; 
import { useNavigate } from 'react-router-dom';

const MenuList = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedMenuItem, setSelectedMenuItem] = useState(null);
  const [formValues, setFormValues] = useState({
    name: '',
    description: '',
    price: '',
    imageUrl: '',
    restaurantId: '',
  });
  const navigate = useNavigate();

  useEffect(() => {
    loadMenuItems();
  }, []);

  const loadMenuItems = async () => {
    try {
      const response = await menuService.getAllMenuItems();
      setMenuItems(response.data);
    } catch (error) {
      console.error('Error fetching menu items:', error);
    }
  };

  const handleEdit = (menuItem) => {
    setSelectedMenuItem(menuItem);
    setFormValues({
      name: menuItem.name,
      description: menuItem.description,
      price: menuItem.price,
      imageUrl: menuItem.imageUrl,
      restaurantId: menuItem.restaurantId,
    });
    setShowEditModal(true);
  };

  const handleDelete = async (menuItemId) => {
    if (window.confirm('Are you sure you want to delete this menu item?')) {
      try {
        await menuService.deleteMenuItem(menuItemId);
        alert('Menu item deleted successfully');
        loadMenuItems();
      } catch (error) {
        console.error('Error deleting menu item:', error);
      }
    }
  };

  const handleChange = (e) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); 
    try {
      const updatedMenuItem = {
        ...selectedMenuItem,
        ...formValues,
        price: parseFloat(formValues.price),
      };
      await menuService.updateMenuItem(selectedMenuItem.id, updatedMenuItem);
      alert('Menu item updated successfully');
      setShowEditModal(false);
      loadMenuItems();

      navigate('/menu-list')
    } catch (error) {
      console.error('Error updating menu item:', error);
    }
  };

  return (
    <Container className="menu-list-container mt-5">
      <h2 className="text-center mb-4">Menu List</h2>
      <Table striped bordered hover responsive className="menu-table">
        <thead>
          <tr>
            <th>Sr.No</th>
            <th>Image</th>
            <th>Name</th>
            <th>Description</th>
            <th>Price</th>
            <th>Restaurant ID</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {menuItems.map((menuItem, index) => (
            <tr key={menuItem.id}>
              <td>{index + 1}</td>
              <td>
                <img
                  src={menuItem.imageUrl}
                  alt={menuItem.name}
                  className="menu-image"
                />
              </td>
              <td>{menuItem.name}</td>
              <td>{menuItem.description}</td>
              <td>{!isNaN(menuItem.price) ? `${parseFloat(menuItem.price).toFixed(2)}` : 'N/A'}</td>
              <td>{menuItem.restaurantId}</td>
              <td>
                <Button
                  variant="outline-primary"
                  size="sm"
                  onClick={() => handleEdit(menuItem)}
                  className="me-2"
                >
                  Edit
                </Button>
                <Button
                  variant="outline-danger"
                  size="sm"
                  onClick={() => handleDelete(menuItem.id)}
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Menu Item</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formName" className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter menu item name"
                name="name"
                value={formValues.name}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group controlId="formDescription" className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Enter description"
                name="description"
                value={formValues.description}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group controlId="formPrice" className="mb-3">
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="number"
                step="0.01"
                placeholder="Enter price"
                name="price"
                value={formValues.price}
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

            <Form.Group controlId="formRestaurantId" className="mb-3">
              <Form.Label>Restaurant ID</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter restaurant ID"
                name="restaurantId"
                value={formValues.restaurantId}
                onChange={handleChange}
              />
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

export default MenuList;
