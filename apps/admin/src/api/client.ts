import axios from 'axios';
import { clearAdminToken, getAdminToken } from '../utils/storage';

const client = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL ?? 'http://127.0.0.1:3000/api',
  timeout: 15000,
});

client.interceptors.request.use((config) => {
  const token = getAdminToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

client.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error?.response?.status === 401) {
      clearAdminToken();
      if (location.pathname !== '/login') {
        location.href = '/login';
      }
    }
    return Promise.reject(error);
  },
);

export default client;