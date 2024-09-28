import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Alert, Form } from 'react-bootstrap';
import orderService from '../services/orderService';
import '../css/OrderList.css';

const OrderList = () => {
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await orderService.getOrders();
        setOrders(response.data);
        setError('');
      } catch (err) {
        setError('Failed to fetch orders. Please try again.');
      }
    };

    fetchOrders();
  }, []);

  // Handle status change
  const handleStatusChange = async (orderId, newStatus) => {
    try {
      const updatedOrders = orders.map((order) =>
        order.id === orderId ? { ...order, status: newStatus } : order
      );
      setOrders(updatedOrders);

      const orderStatus = {
        orderId: orderId,
        status: newStatus,
        updatedAt: new Date().toISOString(),
      };

      await orderService.updateOrderStatus(orderId, orderStatus);

      setError('');
    } catch (err) {
      setError('Failed to update status. Please try again.');
    }
  };

  return (
    <Container className="mt-5 order-list-container">
      <h2 className="text-center mb-4">Order List</h2>
      {error && <Alert variant="danger" className="text-center">{error}</Alert>}
      <Row>
        {orders.length === 0 ? (
          <p className="text-center no-orders">No orders found.</p>
        ) : (
          orders.map((order) => (
            <Col key={order.id} md={6} lg={4} className="mb-4">
              <Card className="shadow-sm order-card">
                <Card.Body>
                  <Card.Title className="order-title">Order ID: {order.id}</Card.Title>
                  <Card.Text>
                    <strong>Customer ID:</strong> {order.customerId}
                    <br />
                    <strong>Address:</strong> {order.address}
                    <br />
                    <strong>Contact:</strong> {order.custNumber}
                    <br />
                    <strong>Total Price:</strong> ₹{order.total}
                    <br />
                    <strong>Date:</strong> {new Date(order.date).toLocaleString()}
                    <br />
                    <strong>Items:</strong>
                    <ul className="order-items-list">
                      {order.items.map((item, index) => (
                        <li key={index} className="order-item">
                          {item.name} - ₹{item.price}
                        </li>
                      ))}
                    </ul>

                    <Form.Group controlId={`statusSelect-${order.id}`} className="mt-3">
                      <Form.Label><strong>Status:</strong></Form.Label>
                      <Form.Control
                        as="select"
                        value={order.status}
                        onChange={(e) => handleStatusChange(order.id, e.target.value)}
                      >
                        <option value="Accepted">Accepted</option>
                        <option value="InProgress">In Progress</option>
                        <option value="Delivered">Delivered</option>
                      </Form.Control>
                    </Form.Group>
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))
        )}
      </Row>
    </Container>
  );
};

export default OrderList;
