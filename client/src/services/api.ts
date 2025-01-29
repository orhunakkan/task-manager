import axios from 'axios';

const api = axios.create({
  baseURL: '/api',
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const register = (userData: any) => {
  return api.post('/users/register', userData);
};

export const login = (credentials: any) => {
  return api.post('/users/login', credentials);
};

export default api;
