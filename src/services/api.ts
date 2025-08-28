import axios from 'axios';
import { useAuthStore } from '../stores/useAuthStore';

const api = axios.create({
  baseURL: 'http://localhost:3000',
  headers: { 'Content-Type': 'application/json' },
});

// Ajout automatique du token si dispo
api.interceptors.request.use((config) => {
  const token = useAuthStore.getState().accessToken;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Intercepteur pour gérer expiration
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const { refreshToken, setAuth, logout, user } = useAuthStore.getState();
    const originalRequest = error.config;

    if (error.response?.status === 401 && refreshToken && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const res = await axios.post('http://localhost:3000/auth/refresh', {
          refresh_token: refreshToken,
        });

        setAuth(user!, res.data.access_token, res.data.refresh_token);

        originalRequest.headers.Authorization = `Bearer ${res.data.access_token}`;
        return api(originalRequest);
      } catch (err) {
        logout();
      }
    }
    return Promise.reject(error);
  }
);

export default api;
