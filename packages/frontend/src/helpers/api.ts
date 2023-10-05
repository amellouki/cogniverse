import axios from "axios";
import {LOCAL_STORAGE} from "@/constants";
import {toast} from "react-toastify";
import {HttpStatus} from "@my-monorepo/shared";

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

apiInstance.interceptors.response.use((response) => {
  return response;
}, (error) => {
  if (!error?.response) {
    if (error) {
      toast('An Error happened', {
        type: "error",
      });
      return Promise.reject(error);
    }
    return;
  }

  switch (error.response.status) {
    case HttpStatus.BAD_REQUEST:
      toast(error.response.data?.message || "Bad request!", {
        type: "error",
      }); break;
    case HttpStatus.UNPROCESSABLE_ENTITY:
      toast("Resource cannot be processed!", {
        type: "error",
      }); break;
    case HttpStatus.UNAUTHORIZED:
      toast("Sorry! You don't have permission to perform this action!", {
        type: "error",
      }); break;
  }
  return Promise.reject(error);
});

export default apiInstance;
