import axios from 'axios';


const API_URL = 'https://localhost:7252/api/Login';

const login = async (username, password) => {
  try {
    const response = await axios.post(`${API_URL}`, { username, password });
    if (response.data.token) {
      localStorage.setItem('user', JSON.stringify(response.data));
    }
    return response.data;
  } catch (error) {
    throw new Error('Invalid username or password.');
  }
};

const logout = () => {
  localStorage.removeItem('user');
};

const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem('user'));
};

const authService = {
  login,
  logout,
  getCurrentUser,
};

export default authService;



