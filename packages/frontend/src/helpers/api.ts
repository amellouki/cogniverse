import axios from "axios";
import {LOCAL_STORAGE} from "@/constants";
import {toast} from "react-toastify";

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

// handle error of type 401 (unauthorized)
apiInstance.interceptors.response.use((response) => {
  return response;
}, (error) => {
  if (error.response.status === 401) {
    toast("Sorry! You don't have permission to perform this action!", {
      type: "error",
    })
  }
  return Promise.reject(error);
});

export default apiInstance;
