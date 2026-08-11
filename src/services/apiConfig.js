import axios from 'axios';
import { getStoredToken, clearAuthData } from '../utils/localStorage';
import { store } from '../app/store';
import { logout } from '../features/auth/slice/authSlice';

export const api = axios.create({
  baseURL: 'http://localhost:3001',
});

// Request Interceptor: Hər sorğunun header-inə token əlavə edir
api.interceptors.request.use(
  (config) => {
    const token = getStoredToken();

    if (!token) {
      clearAuthData();
      store.dispatch(logout());
      const error = new Error('Session expired or token missing');
      error.response = { status: 401 };
      return Promise.reject(error);
    }

    config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => Promise.reject(error)
);

// Response Interceptor: 401 xətasını tutub həssas state-i sıfırlayır
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      clearAuthData();
      store.dispatch(logout());
      window.location.replace('/login');
    }
    return Promise.reject(error);
  }
);