import axios from "axios";
import { store } from "./constant";
import { logoutUser } from "../redux/slice/userSlice";

const baseURL = process.env.ENVIRONMENT =="development" ? process.env.NEXT_PUBLIC_BACKEND_DEV_BASE_URL : process.env.NEXT_PUBLIC_BACKEND_DEV_BASE_URL;

export const axiosInstance = axios.create({
    baseURL,
    withCredentials: true,
});



// Interceptors for request
axiosInstance.interceptors.request.use(
    (config) => {
        return config;
    },
    (error) => {
        // Do something with response error
        return Promise.reject(error);
    }
);

// // Interceptors for response
axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        // Prevent infinite loop if refresh-token itself fails
        if (originalRequest.url.includes("/refresh-token")) {
            store.dispatch(logoutUser());
            return Promise.reject(error);
        }

        // Retry only once for 401s
        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            try {
                await axiosInstance.post("/api/v1/users/refresh-token");
                return axiosInstance(originalRequest);
            } catch (refreshError) {
                console.log("Refresh failed:", refreshError.response?.data || refreshError.message);
                store.dispatch(logoutUser());
                return Promise.reject(refreshError);
            }
        }

        return Promise.reject(error);
    }
);