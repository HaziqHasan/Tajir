import axios from "axios";

// Axios instance create
const apiClient = axios.create({
  baseURL:
    process.env.REACT_APP_API_BASE_URL || "https://tajir-back.onrender.com/",
  headers: {
    "Content-Type": "application/json",
  },
});

// Request Interceptor → Token auto attach
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("access");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response Interceptor → Central Error Handling
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (!error.response) {
      console.error("Network error - server unreachable");
      alert("Network error, please check your internet connection.");
      return Promise.reject(error);
    }

    const status = error.response.status;

    if (status === 401) {
      // Token invalid/expired → logout
      localStorage.removeItem("access");
      localStorage.removeItem("refresh");
      window.location.href = "/login";
    } else if (status === 403) {
      alert("You do not have permission to perform this action.");
    } else if (status >= 500) {
      alert("Server error, please try again later.");
    }

    return Promise.reject(error);
  }
);

export default apiClient;
