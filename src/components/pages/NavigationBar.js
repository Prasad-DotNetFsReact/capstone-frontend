import React, { useContext } from 'react';
import { Navbar, Nav, NavDropdown, Badge, Button, Image } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import '../css/Navigation.css'; 
import img from '../img/logoone8.jpg';

const NavigationBar = () => {
  const navigate = useNavigate();
  const { cartItems } = useContext(CartContext);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  const handleViewCart = () => {
    navigate('/cart');
  };

  const handleOrders = () => {
    navigate('/orders');
  };
//bg="light"
//sticky="top"
  return (
    <Navbar className="nvg-br navbar-custom"  expand="lg"  variant="light" style={{ backgroundColor: '#FF8C00' }} >
      <Navbar.Brand href="/customer-dashboard" className="d-flex align-items-center">
        <Image
          src={img}
          width="80"
          height="80"
          className="d-inline-block align-top mr-2"
          alt="Company Logo"
        />
        <span className="brand-name">One8 Food Delivery services</span>
      </Navbar.Brand>

      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ml-auto align-items-center">
          
          
          <Nav.Link className="nav-item-spacing" onClick={handleOrders}>Your Orders</Nav.Link>

          
          <Nav.Item className="nav-item-spacing">
            <Button variant="outline-primary" className="cart-btn" onClick={handleViewCart}>
              Cart
              {cartItems.length > 0 && (
                <Badge pill variant="danger" className="ml-2">
                  {cartItems.length}
                </Badge>
              )}
            </Button>
          </Nav.Item>

          
          <NavDropdown
            title="Profile"
            id="basic-nav-dropdown"
            className="nav-item-spacing"
            alignRight
          >
            <NavDropdown.Item href="#">View Profile</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item onClick={handleLogout}>Logout</NavDropdown.Item>
          </NavDropdown>
          
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavigationBar;



