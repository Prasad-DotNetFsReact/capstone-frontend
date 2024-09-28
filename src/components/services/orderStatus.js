import axios from 'axios';

const API_URL = 'http://localhost:4000/orders'; 

const getOrders = () => {
  return axios.get(API_URL);
};

const orderStatus = {
  getOrders,
};

export default orderStatus;