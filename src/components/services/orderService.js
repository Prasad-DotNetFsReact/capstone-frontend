import axios from 'axios';

const API_URL = 'http://localhost:4000/orders'; 

const getOrders = async () => {
  const response = await axios.get(API_URL);
  return response;
};

const updateOrderStatus = async (orderId, status) => {
  try {
    const response = await axios.put(`${API_URL}/${orderId}/status`, { status });
    return response.data;
  } catch (error) {
    console.error('Error updating order status:', error);
    throw error;
  }
};

const orderService = {
  getOrders,
  updateOrderStatus,
};

export default orderService;

