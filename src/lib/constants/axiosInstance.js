import axios from "axios";

const baseURL = process.env.NEXT_PUBLIC_BACKEND_DEV_BASE_URL;

export const axiosInstance = axios.create({
    baseURL,
    withCredentials: true,
});
