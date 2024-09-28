import React, { useState } from 'react';
import AddRestaurant from '../restaurant/AddRestaurant';
import RestaurantList from '../restaurant/RestaurantList';
import AddMenu from '../menuitem/AddMenu';
import MenuList from '../menuitem/MenuList';
import OrderList from '../order/OrderList';
import { Dropdown, Nav, Navbar, Container } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';
import '../css/AdminDashboard.css'; 
import logo from '../img/logoone8.jpg';
import Footer from '../pages/Footer';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
  const [activeSection, setActiveSection] = useState('restaurantList');  
  const navigate = useNavigate();

  const handleSectionChange = (section) => {
    setActiveSection(section);
  };

  const handleLogout = () => { 
    localStorage.removeItem('token');
    navigate('/'); 
  };

  return (
    <div>
      <Navbar expand="lg" className="navbar-one8" variant='dark'>
        <Container>
          <Navbar.Brand className="d-flex align-items-center">
            <img src={logo} alt="Company Logo" height="50" className="logo-img" />
            <span className="ml-3 company-name">One8 Food Delivery Services</span>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              
              <Dropdown as={Nav.Item} className="nav-item-custom">
                <Dropdown.Toggle as={Nav.Link} className="nav-link-custom">Restaurants</Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item onClick={() => handleSectionChange('addRestaurant')}>
                    Add Restaurant
                  </Dropdown.Item>
                  <Dropdown.Item onClick={() => handleSectionChange('restaurantList')}>
                    Restaurant List
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>

              <Dropdown as={Nav.Item} className="nav-item-custom">
                <Dropdown.Toggle as={Nav.Link} className="nav-link-custom">Orders</Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item onClick={() => handleSectionChange('orderList')}>
                    Order List
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
{/* 
              <Dropdown as={Nav.Item} className="nav-item-custom">
                <Dropdown.Toggle as={Nav.Link} className="nav-link-custom">Menu Items</Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item onClick={() => handleSectionChange('addMenuItem')}>
                    Add Menu Item
                  </Dropdown.Item>
                  <Dropdown.Item onClick={() => handleSectionChange('menuList')}>
                    Menu List
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown> */}
            </Nav>

            <Dropdown align="end" className="ml-auto">
            <Dropdown.Toggle 
              variant="outline-light" 
              id="dropdown-basic"          
              className="profile-dropdown">
              <FontAwesomeIcon icon={faUserCircle} size="2x" />
            </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item href="#/profile">Profile</Dropdown.Item>
                <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <div className="container mt-5">
        <h4 className="dashboard-title">Admin Dashboard</h4>
        <h2>Hello,Prasad</h2>

        {activeSection === 'addRestaurant' && (
          <div className="dashboard-section">
            <AddRestaurant />
          </div>
        )}

        {activeSection === 'restaurantList' && (
          <div className="dashboard-section">
            <RestaurantList />
          </div>
        )}

        {/* {activeSection === 'addMenuItem' && (
          <div className="dashboard-section">
            <AddMenu />
          </div>
        )}

        {activeSection === 'menuList' && (
          <div className="dashboard-section">
            <MenuList />
          </div>
        )} */}

        {activeSection === 'orderList' && (
          <div className="dashboard-section">
            <OrderList />
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default AdminDashboard;
