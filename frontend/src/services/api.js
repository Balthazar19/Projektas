import axios from 'axios';

const api = axios.create({
  baseURL: 'https://localhost:3001/api',
  headers: {
    'Custom-Header': 'CustomValue'
  }
});

export default api;
