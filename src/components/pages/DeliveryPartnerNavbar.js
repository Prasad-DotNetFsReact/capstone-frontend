import React from 'react';
import { Navbar, Nav, Container, Button, Image } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import '../css/DeliveryPartnerNavbar.css'; 
import logoone8 from '../img/logoone8.jpg'; 

const DeliveryPartnerNavbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    console.log('Logout clicked');
    localStorage.clear();
    navigate('/');
  };

  return (
    <Navbar expand="lg" className="delivery-custom">
      <Container>
        <Navbar.Brand href="#" className="d-flex align-items-center">
          <Image
            src={logoone8} 
            height="50" 
            width="50" 
            className="me-2 logo-img" 
            alt="Logo"
          />
          <span className="brand-text">One8 Food Delivery Services</span>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" className="custom-toggler" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link href="#" className="custom-nav-link">Orders</Nav.Link>
            {/* <Nav.Link href="#" className="custom-nav-link">Profile</Nav.Link>
            <Nav.Link href="#" className="custom-nav-link">Support</Nav.Link>  */}
          </Nav>
          <Button variant="outline-light" className="custom-logout-btn" onClick={handleLogout}>
            Logout
          </Button>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default DeliveryPartnerNavbar;
