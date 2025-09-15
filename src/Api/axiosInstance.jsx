import axios from "axios";
import { baseURL } from "./endpoint";

const axiosInstance = axios.create({
    baseURL,
});

axiosInstance.interceptors.request.use(
    async function (config) {
        const token = localStorage.getItem("token");
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
