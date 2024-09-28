import React, { useEffect, useState, useContext } from 'react';
import { Card, Button, Container, Row, Col } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import MenuService from '../services/menuService';
import { CartContext } from '../context/CartContext';
import NavigationBar from '../pages/NavigationBar';
import '../css/Menu.css'; // Import the custom CSS file

const Menu = () => {
  const [menuItems, setMenuItems] = useState([]);
  const { addToCart } = useContext(CartContext);
  const { id } = useParams(); 

  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        const response = await MenuService.getAllMenuItems(id);
        setMenuItems(response.data);
      } catch (error) {
        console.error('Error fetching menu items:', error);
      }
    };

    fetchMenuItems();
  }, [id]);

  return (
    <Container className="mt-5">
      <NavigationBar />
      <h2 className="text-center mb-4">Menu Items</h2>
      <Row>
        {menuItems.map((item) => (
          <Col key={item.id} md={4} sm={6} xs={12} className="mb-4">
            <Card className="menu-card">
              <Card.Img variant="top" src={item.imageUrl} alt={item.name} />
              <Card.Body className="menu-card-body">
                <Card.Title className="menu-card-title">{item.name}</Card.Title>
                <Card.Text className="menu-card-text">{item.description}</Card.Text>
                <Card.Text className="price-text">
                  Price: {!isNaN(item.price) ? parseFloat(item.price).toFixed(2) : 'N/A'}
                </Card.Text>
                <Button
                  className="btn-add-cart"
                  onClick={() => addToCart(item)} 
                >
                  Add to Cart
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Menu;

