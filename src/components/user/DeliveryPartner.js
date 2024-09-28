import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Table, Badge, Form } from 'react-bootstrap';
import orderService from '../services/orderService'; 
import '../css/DeliveryPartner.css'; 
import Footer from '../pages/Footer';
import DeliveryPartnerNavbar from '../pages/DeliveryPartnerNavbar';

const DeliveryPartner = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await orderService.getOrders(); 
        setOrders(response.data);
      } catch (err) {
        console.error('Failed to fetch orders:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

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
    } catch (err) {
      console.error('Failed to update status:', err);
    }
  };

  return (
    <Container className="mt-5 delivery-partner-container">
      <DeliveryPartnerNavbar />
      <Row className="mb-4">
        <Col className="text-center">
          <h2 className="display-4">Delivery Partner Dashboard</h2>
          <p className="welcome-message">Hello Prasad, here are your current orders.</p>
        </Col>
      </Row>

      {loading ? (
        <p className="text-center">Loading orders...</p>
      ) : orders.length === 0 ? (
        <p className="text-center no-orders">No orders assigned yet.</p>
      ) : (
        <Row>
          <Col>
            <Card className="shadow-lg orders-card">
              <Card.Body>
                <Card.Title className="orders-card-title">Order List</Card.Title>
                <Table responsive bordered hover className="order-table">
                  <thead>
                    <tr>
                      <th>Order ID</th>
                      <th>Customer</th>
                      <th>Address</th>
                      <th>Contact</th>
                      <th>Total</th>
                      <th>Date</th>
                      <th>Status</th>
                      <th>Update Status</th> {/* Added new column for dropdown */}
                    </tr>
                  </thead>
                  <tbody>
                    {orders.map((order) => (
                      <tr key={order.id}>
                        <td>{order.id}</td>
                        <td>{order.customerId}</td>
                        <td>{order.address}</td>
                        <td>{order.custNumber}</td>
                        <td>₹{order.total}</td>
                        <td>{new Date(order.date).toLocaleString()}</td>
                        <td>
                          <Badge pill bg={order.status === 'Delivered' ? 'success' : 'warning'}>
                            {order.status}
                          </Badge>
                        </td>
                        <td>
                          <Form.Group controlId={`statusSelect-${order.id}`}>
                            <Form.Control
                              as="select"
                              value={order.status}
                              onChange={(e) => handleStatusChange(order.id, e.target.value)}
                            >
                              <option value="Select">Select</option>
                              <option value="Accepted">Accept</option>
                              <option value="Rejected">Reject</option>
                            </Form.Control>
                          </Form.Group>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      )}
      <Footer />
    </Container>
  );
};

export default DeliveryPartner;
