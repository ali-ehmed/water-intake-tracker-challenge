import axios from "axios";
import type { AxiosResponse, AxiosError } from "axios";

const instance = axios.create({
  baseURL: "http://localhost:3001/", // adjust if needed
  headers: {
    "Content-Type": "application/json",
  },
});

// Optional interceptor example
interface ApiResponse<T = any> extends AxiosResponse<T> {}
interface ApiError<T = any> extends AxiosError<T> {}

instance.interceptors.response.use(
  (response: ApiResponse) => response,
  (error: ApiError) => {
    console.error("API error:", error);
    return Promise.reject(error);
  }
);

export default instance;
