import axios from "axios";
const env = process.env.NEXT_PUBLIC_ENV || 'dev';
const appenv = process.env.NEXT_PUBLIC_APP_ENV || 'quality';

const baseUrl = {
    dev: {
        quality: import.meta.env.NEXT_PUBLIC_APIURL_DEVQ,
        production: import.meta.env.NEXT_PUBLIC_APIURL_DEVP,
    },
    live: {
        quality: import.meta.env.NEXT_PUBLIC_APIURL_QAS,
        production: import.meta.env.NEXT_PUBLIC_APIURL_PRD,
    }
};

const axiosInstance = axios.create({
    baseURL: baseUrl[env][appenv],
    withCredentials: true, // crucial for cookies
});

export default axiosInstance;