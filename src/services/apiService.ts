import axios from "axios";

const fullUrl = window.location.href;
let apiUrl = import.meta.env.VITE_API_URL;
console.log("URL completa:", fullUrl);

if (!fullUrl.includes("localhost")) {
  apiUrl = "http://10.200.1.145:8000/api";
}

const api = axios.create({
  baseURL: apiUrl as string,
  headers: {
    "Content-Type": "application/json",
  },
});
console.log("API URL:", apiUrl);

export default api;
