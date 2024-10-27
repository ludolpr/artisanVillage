import axios from "axios";

const API_BASE_URL = "https://api.artisanvillage.fr/api";

export const api = axios.create({
  baseURL: API_BASE_URL,
});

api.interceptors.request.use(
  (config) => {
    // Retrieves the access token stored in the browser's localStorage
    const token = localStorage.getItem("access_token");

    // If a token exists, add an Authorization header to the request
    if (token) {
      // The header format is "Bearer <token>", used for authentication
      config.headers.Authorization = `Bearer ${token}`;
    }

    // Returns the query configuration (possibly modified) to continue the process
    return config;
  },
  (error) => {
    // If an error occurs before the request is sent, it is rejected and processed
    return Promise.reject(error);
  }
);
