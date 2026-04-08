import axios from "axios";
const env = import.meta.env.VITE_ENV || 'dev';
const appenv = import.meta.env.VITE_APP_ENV || 'quality';

const baseUrl = {
    dev: {
        quality: import.meta.env.VITE_APIURL_DEVQ,
        production: import.meta.env.VITE_APIURL_DEVP,
    },
    live: {
        quality: import.meta.env.VITE_APIURL_QAS,
        production: import.meta.env.VITE_APIURL_PRD,
    }
};

// const basicAuthHeader = 'Basic ' + btoa(`${import.meta.env.VITE_API_USR}:${import.meta.env.VITE_API_PSS}`);

const axiosInstance = axios.create({
    baseURL: baseUrl[env][appenv],
    withCredentials: true, // ✅ crucial for cookies
});

export default axiosInstance;