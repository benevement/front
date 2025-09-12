import axios from "axios";
import { useAuthStore } from "../stores/useAuthStore";
import { updateStoreWithToken } from "./UserService";

const api = axios.create({

  baseURL: 'http://localhost:3000',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
    //'Access-Control-Allow-Origin': '*',    
    }
});

let refreshPromise: Promise<void> | null = null;

export const refreshToken = async () => {
  if (!refreshPromise) {
    console.log("[API] Refresh token request sent...");
    refreshPromise = api
      .post("/auth/refresh", {}, { withCredentials: true })
      .then((res) => {
        console.log("[API] Refresh token response:", res.data);
        if (res.data?.accessToken) {
          updateStoreWithToken(res.data?.accessToken);
        } else {
          throw new Error("No accessToken in refresh response");
        }
      })
      .catch((err) => {
        console.log("[API] Refresh failed:", err);
        useAuthStore.getState().logout();
        throw err;
      })
      .finally(() => {
        refreshPromise = null;
      });
  }
  return refreshPromise;
};

// Ajouter l’accessToken automatiquement
api.interceptors.request.use((config) => {
  const token = useAuthStore.getState().accessToken;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Intercepteur réponse pour gérer expiration
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        await refreshToken();
        const token = useAuthStore.getState().accessToken;
        if (token) {
          originalRequest.headers.Authorization = `Bearer ${token}`;
        }
        return api(originalRequest);
      } catch (err) {
        return Promise.reject(err);
      }
    }
    return Promise.reject(error);
  }
);

export default api;
