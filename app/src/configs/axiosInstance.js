import axios from "axios";
const env = process.env.NEXT_PUBLIC_ENV || 'dev';
const appenv = process.env.NEXT_PUBLIC_APP_ENV || 'quality';

const baseUrl = {
    dev: {
        quality: process.env.NEXT_PUBLIC_APIURL_DEVQ,
        production: process.env.NEXT_PUBLIC_APIURL_DEVP,
    },
    live: {
        quality: process.env.NEXT_PUBLIC_APIURL_QAS,
        production: process.env.NEXT_PUBLIC_APIURL_PRD,
    }
};

const axiosInstance = axios.create({
    baseURL: baseUrl[env][appenv],
    withCredentials: true, // crucial for cookies
});

export default axiosInstance;