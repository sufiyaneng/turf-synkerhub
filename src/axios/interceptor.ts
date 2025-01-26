import axios, { AxiosResponse, InternalAxiosRequestConfig } from 'axios';

// Define types for the refresh token response
interface RefreshTokenResponse {
  token: {
    accessToken: string;
    refreshToken: string;
  };
 
}

// Create an Axios instance with a base URL
const api = axios.create({
  baseURL: 'http://localhost:5000', // Ensure this is present in your .env file
});

// Add an interceptor for requests to include the access token
api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const accessToken = localStorage.getItem('accessToken'); // Retrieve access token from storage
    if (accessToken && config.headers) {
      config.headers['Authorization'] = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add an interceptor for responses to handle 401 errors
api.interceptors.response.use(
  (response: AxiosResponse) => response, // Return response if successful
  async (error) => {
    const originalRequest = error.config;

    // Check if the error is due to an unauthorized response
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true; // Prevent infinite retry loops

      try {
        // Call the refresh token API
        const refreshToken = localStorage.getItem('refreshToken');
        if (!refreshToken) {
          throw new Error('Refresh token not available');
        }

        const { data } = await axios.post<RefreshTokenResponse>(
          `http://localhost:5000/auth/refresh`,
          { refreshToken }
        );

        // Update access token in localStorage
        localStorage.setItem('accessToken', data.token.accessToken);

        // Update the Authorization header with the new token
        originalRequest.headers['Authorization'] = `Bearer ${data.token.accessToken}`;

        // Retry the original request
        return api(originalRequest);
      } catch (refreshError) {
        console.error('Refresh token failed:', refreshError);
        // Optionally, logout user or redirect to login page
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        window.location.href = '/login'; // Adjust as needed
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default api;
