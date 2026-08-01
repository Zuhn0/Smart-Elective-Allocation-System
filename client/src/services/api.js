import axios from "axios";

const api = axios.create({
  baseURL: "https://smart-elective-allocation-system.onrender.com",
});

export default api;
