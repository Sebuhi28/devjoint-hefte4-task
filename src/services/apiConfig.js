import axios from 'axios';
import { getStoredToken, clearAuthData } from '../utils/localStorage';

export const api = axios.create({
  baseURL: 'http://localhost:3001', // json-server ünvanı
});

// Request Interceptor: Hər sorğunun header-inə token əlavə edir
api.interceptors.request.use((config) => {
  const token = getStoredToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response Interceptor: 401 xətasını tutub həssas state-i sıfırlayır
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      clearAuthData();
      // Sonsuz dövrə düşməmək üçün təmizləyib sərt yönləndirmə edirik
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);