import React, { useState } from 'react';
import { Row, Col, Button } from 'react-bootstrap';
import Restaurant from '../restaurant/Restaurant';
import NavigationBar from '../pages/NavigationBar';
import Footer from '../pages/Footer';
import '../css/CustomerDashboard.css'; 

const CustomerDashboard = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const handleCategoryFilter = (category) => {
    setSelectedCategory(category);
  };

  return (
    <>
      <NavigationBar />
      <div className="container mt-5 restaurant-container">
      <div className='background-image'>
        <h3 className="text-center mb-4 welcome-text " style={{ color: 'black'}}>Welcome back, Prasad</h3>
        <Row className="justify-content-center mb-4">
          <Col md={6}>
            <input
              type="text"
              className="form-control search-input"
              placeholder="Search for restaurants, cuisines, or dishes"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </Col>
        </Row>
        </div>

        <Row className="mb-4 text-center category-buttons">
          <Col>
            <Button
              variant="outline-dark"
              onClick={() => handleCategoryFilter('All')}
              className={`category-button mx-2 ${selectedCategory === 'All' ? 'active' : ''}`}>
              All
            </Button>
            <Button
              variant="outline-dark"
              onClick={() => handleCategoryFilter('Fast Food')}
              className={`category-button mx-2 ${selectedCategory === 'Fast Food' ? 'active' : ''}`}>
              Fast Food
            </Button>
            <Button
              variant="outline-dark"
              onClick={() => handleCategoryFilter('Fine Dining')}
              className={`category-button mx-2 ${selectedCategory === 'Fine Dining' ? 'active' : ''}`}>
              Fine Dining
            </Button>
            <Button
              variant="outline-dark"
              onClick={() => handleCategoryFilter('Cafes')}
              className={`category-button mx-2 ${selectedCategory === 'Cafes' ? 'active' : ''}`}>
              Cafes
            </Button>
            <Button
              variant="outline-dark"
              onClick={() => handleCategoryFilter('Vegetarian')}
              className={`category-button mx-2 ${selectedCategory === 'Vegetarian' ? 'active' : ''}`}>
              Vegetarian
            </Button>
          </Col>
        </Row>
        <Restaurant search={searchTerm} selectedCategory={selectedCategory} />
        <Footer />
      </div>
    </>
  );
};

export default CustomerDashboard;
