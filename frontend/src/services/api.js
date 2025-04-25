import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://localhost:3001/api',
  headers: {
    'Custom-Header': 'CustomValue'
  }
});

// auth header funkcija
export function setAuthToken(token) {
  instance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}

export default instance;
