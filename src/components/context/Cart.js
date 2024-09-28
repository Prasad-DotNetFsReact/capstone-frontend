import React, { useContext, useState } from 'react';
import { Container, Row, Col, Button, Alert, Card } from 'react-bootstrap';
import { CartContext } from '../context/CartContext';
import NavigationBar from '../pages/NavigationBar';
import Footer from '../pages/Footer';
import cartService from '../services/cartService';
import { useNavigate } from 'react-router-dom';
import '../css/Cart.css';

const Cart = () => {
  const { cartItems, removeFromCart, clearCart, updateCartItemQuantity, message } = useContext(CartContext);
  const [error, setError] = useState('');
  const [billGenerated, setBillGenerated] = useState(false); // State for bill generation
  const navigate = useNavigate();

  const [customerId] = useState('1');
  const [address] = useState('Andheri, Mumbai');
  const [orderDeliveryBoyId] = useState('1');
  const [custNumber] = useState('+91 7821040055');

  const totalPrice = cartItems
    .reduce((acc, item) => acc + parseFloat(item.price || 0) * (item.quantity || 1), 0)
    .toFixed(2);

  const handleGetBill = async (event) => {
    event.preventDefault();
    try {
      const billData = {
        items: cartItems,
        total: totalPrice,
        date: new Date().toISOString(),
        customerId,
        address,
        orderDeliveryBoyId,
        custNumber,
      };

      await cartService.saveBill(billData);
      setError(''); 
      setBillGenerated(true); 
    } catch (err) {
      setError('Failed to generate bill. Please try again.');
    }
  };

  return (
    <Container className="mt-5 cart-container">
      <NavigationBar />
      <h2 className="text-center mb-4 cart-title">
        {billGenerated ? 'Your Bill' : 'Your Cart'}
      </h2>

      {message && <Alert variant="success" className="text-center">{message}</Alert>}
      {error && <Alert variant="danger" className="text-center">{error}</Alert>}

      {!billGenerated ? (
        cartItems.length === 0 ? (
          <p className="text-center empty-cart">Your cart is empty</p>
        ) : (
          <>
            <Row>
              {cartItems.map((item) => (
                <Col key={item.id} md={6} lg={4} className="mb-4">
                  <Card className="cart-item-card shadow-sm">
                    <Card.Body>
                      <Card.Title className="cart-item-title">{item.name}</Card.Title>
                      <Card.Text>
                        <strong>Price:</strong> ₹{parseFloat(item.price).toFixed(2)} <br />
                        <strong>Quantity:</strong>
                        <div className="quantity-controls">
                          <Button
                            variant="outline-secondary"
                            size="sm"
                            onClick={() => updateCartItemQuantity(item.id, item.quantity - 1)}
                            disabled={item.quantity <= 1}
                          >
                            -
                          </Button>
                          <span className="quantity-value">{item.quantity}</span>
                          <Button
                            variant="outline-secondary"
                            size="sm"
                            onClick={() => updateCartItemQuantity(item.id, item.quantity + 1)}
                          >
                            +
                          </Button>
                        </div>
                      </Card.Text>
                      <Button
                        variant="danger"
                        onClick={() => removeFromCart(item.id)}
                        className="btn-remove"
                      >
                        Remove
                      </Button>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
            <h4 className="text-center total-price">Total Price: ₹{totalPrice}</h4>
            <div className="text-center mb-4">
              <Button variant="secondary" onClick={clearCart} className="btn-clear">
                Clear Cart
              </Button>
            </div>
            <div className="text-center">
              <Button variant="primary" onClick={handleGetBill} className="btn-get-bill">
                Get Bill
              </Button>
            </div>
          </>
        )
      ) : (
        <div className="bill-section text-center">
          <h4>Bill Summary</h4>
          <p><strong>Customer ID:</strong> {customerId}</p>
          <p><strong>Delivery Address:</strong> {address}</p>
          <p><strong>Contact Number:</strong> {custNumber}</p>
          <h5 className="mt-4">Order Details:</h5>
          <ul className="list-unstyled">
            {cartItems.map((item) => (
              <li key={item.id}>
                {item.name} - ₹{parseFloat(item.price).toFixed(2)} x {item.quantity}
              </li>
            ))}
          </ul>
          <h5 className="mt-4 total-price">Total Amount: ₹{totalPrice}</h5>
          <div className="text-center mt-4">
            <Button variant="success" onClick={() => navigate('/')}>
              Back to Home
            </Button>
          </div>
        </div>
      )}

      <Footer />
    </Container>
  );
};

export default Cart;
