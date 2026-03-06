import axios from 'axios';

const api = axios.create({
  baseURL: 'https://jira.codeup.in', // Matches your backend PORT [cite: 21]
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`; // Required by verifyToken [cite: 21]
  }
  return config;
});

export default api;