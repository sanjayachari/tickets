import axios from "axios";

// const BASE_URL = "https://core.staybook.in/api/v1"
const BASE_URL = "http://localhost:8080/api/v1"
const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export default apiClient;
