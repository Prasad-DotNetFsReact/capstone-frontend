import axios from 'axios';

const API_URL = 'https://localhost:7252/api/Restaurant'; 

class RestaurantService {
  getAllRestaurants() {
    return axios.get(API_URL);
  }

  getRestaurantById(id) {
    return axios.get(`${API_URL}/${id}`);
  }

  addRestaurant(restaurant) {
    return axios.post(API_URL, restaurant);
  }

  updateRestaurant(id, restaurant) {
    return axios.put(`${API_URL}/${id}`, restaurant);
  }

  deleteRestaurant(id) {
    return axios.delete(`${API_URL}/${id}`);
  }
}

export default new RestaurantService();
