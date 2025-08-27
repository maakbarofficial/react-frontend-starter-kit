import axios from 'axios';
import useAuthStore from '@/stores/Auth/authStore';

const BASE_URL = 'https://dummyjson.com'; // For Dev
// const BASE_URL = 'http://api.test/api'; // For Local

const axiosClient = axios.create({
  baseURL: BASE_URL,
  timeout: 100000,
});

let isRefreshing = false;
let failedRequestsQueue = [];

const processQueue = (error, token = null) => {
  failedRequestsQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedRequestsQueue = [];
};

// Request interceptor
axiosClient.interceptors.request.use(
  (config) => {
    const { token } = useAuthStore.getState();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// Response interceptor
axiosClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        // If refresh token request is in progress, queue the failed request
        return new Promise((resolve, reject) => {
          failedRequestsQueue.push({ resolve, reject });
        })
          .then(() => {
            originalRequest.headers.Authorization = `Bearer ${useAuthStore.getState().token}`;
            return axiosClient(originalRequest);
          })
          .catch((err) => {
            return Promise.reject(err);
          });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const { token } = useAuthStore.getState();

        // Call refresh token API
        const refreshTokenResponse = await axios.get(`${BASE_URL}/refresh-token`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const newToken = refreshTokenResponse?.data?.token;

        if (newToken) {
          // Update token in store
          useAuthStore.getState().setToken(newToken);

          // Update Authorization header
          axiosClient.defaults.headers.common['Authorization'] = `Bearer ${newToken}`;

          // Process queued requests
          processQueue(null, newToken);

          // Retry original request
          originalRequest.headers.Authorization = `Bearer ${newToken}`;
          return axiosClient(originalRequest);
        } else {
          throw new Error('No token received from refresh endpoint');
        }
      } catch (refreshError) {
        // Handle refresh token failure (e.g., logout user)
        processQueue(refreshError);
        window.dispatchEvent(new Event('logout'));
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  },
);

export default axiosClient;
