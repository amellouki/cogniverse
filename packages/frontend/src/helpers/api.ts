import axios from "axios";
import {LOCAL_STORAGE} from "@/constants";

const apiInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_API,
});


apiInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem(LOCAL_STORAGE.TOKEN);
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

export default apiInstance;
