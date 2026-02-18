import axios from "axios";
import { baseURL } from "./endpoint";

const axiosInstance = axios.create({
    baseURL,
});

axiosInstance.interceptors.request.use(
    async function (config) {
        // Prefer user token when available, fallback to admin token.
        const token =
            localStorage.getItem("userToken") || localStorage.getItem("token");
        if (token !== null && token !== undefined && token !== "") {
            config.headers["token"] = token;
        }
        return config;
    },
    function (error) {
        return Promise.reject(error?.message);
    }
);

export default axiosInstance;
