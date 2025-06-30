import axios from 'axios';

const AUTH_API_URL = 'https://x8ki-letl-twmt.n7.xano.io/api:bgqxlzBg';
const MAIN_API_URL = 'https://x8ki-letl-twmt.n7.xano.io/api:1SQ_3buL';

// Create a client for auth endpoints (doesn't need token)
export const authApi = axios.create({
  baseURL: AUTH_API_URL,
});

// Create a client for the main API endpoints
export const mainApi = axios.create({
  baseURL: MAIN_API_URL,
});

// Use an interceptor to automatically add the auth token to requests
mainApi.interceptors.request.use(
  (config) => {
    // Only check for token in browser environment
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('authToken');
      if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
