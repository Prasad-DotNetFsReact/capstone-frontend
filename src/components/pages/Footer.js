import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faTwitter, faInstagram } from '@fortawesome/free-brands-svg-icons';
import '../css/Footer.css'; 

const Footer = () => {
  return (
    <footer className="footer text-center py-4">
      <Container>
        <Row>
          <Col md={12}>
            <h5>One8 Food Delivery Services</h5>
            <p>Delivering delicious food to your doorstep.</p>
          </Col>
        </Row>

        <Row className="social-icons mt-3">
          <Col>
            <a href="#" className="text-dark me-3">
              <FontAwesomeIcon icon={faFacebook} size="lg" />
            </a>
            <a href="#" className="text-dark me-3">
              <FontAwesomeIcon icon={faTwitter} size="lg" />
            </a>
            <a href="#" className="text-dark">
              <FontAwesomeIcon icon={faInstagram} size="lg" />
            </a>
          </Col>
        </Row>

        <Row>
          <Col className="text-center mt-3">
            <p>&copy; {new Date().getFullYear()} One8 Food Delivery Services. All rights reserved.</p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;

