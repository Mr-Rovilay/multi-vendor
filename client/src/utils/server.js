import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000", // Your server's base URL
  withCredentials: true,               // Ensures cookies are sent with requests
});

export default api;
