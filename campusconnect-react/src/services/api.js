// src/services/api.js
import axios from 'axios';

const API = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:5000/api'
});

// attach token if present
API.interceptors.request.use(config => {
  const user = JSON.parse(localStorage.getItem('user')) || null; // adapt to your auth
  if (user && user.token) {
    config.headers.Authorization = `Bearer ${user.token}`;
  }
  return config;
});

export default API;
