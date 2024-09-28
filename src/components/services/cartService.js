import axios from 'axios';
const API_URL = 'http://localhost:4000/orders';


const saveBill = async (billData) => {
  return await axios.post(API_URL, billData);
};
export default {
  saveBill,
};
