import axios from 'axios';

const API_URL = 'http://localhost:4000/menuItems';
class MenuService {
  getAllMenuItems() {
    return axios.get(API_URL);
  }

  getMenuItemById(id) {
    return axios.get(`${API_URL}/${id}`);
  }

  addMenuItem(menuItem) {
    return axios.post(API_URL, menuItem);
  }

  updateMenuItem(id, menuItem) {
    return axios.put(`${API_URL}/${id}`, menuItem);
  }

  deleteMenuItem(id) {
    return axios.delete(`${API_URL}/${id}`);
  }
}

export default new MenuService();
