import axios from "axios";
import { clearAuthState } from "@/redux/slices/authSlice";

const appenv = process.env.NEXT_PUBLIC_ENV || "development";

const baseUrl = {
    production: process.env.NEXT_PUBLIC_APIURL_PRD,
    quality: process.env.NEXT_PUBLIC_APIURL_QAS,
    development: process.env.NEXT_PUBLIC_APIURL_DEV,
};

const basicAuthHeader = "Basic " + btoa(`${process.env.NEXT_PUBLIC_API_USR}:${process.env.NEXT_PUBLIC_API_PSS}`);

const axiosInstance = axios.create({
    baseURL: baseUrl[appenv],
    withCredentials: true,
});

let isRefreshing = false;
let failedQueue = [];

const processQueue = (error) => {
    failedQueue.forEach((promise) => {
        if (error) {
            promise.reject(error);
        } else {
            promise.resolve();
        }
    });

    failedQueue = [];
};

export const setupInterceptors = (store) => {
    //----------------------------------------------------------
    // REQUEST
    //----------------------------------------------------------
    axiosInstance.interceptors.request.use(
        (config) => {
            const isFormData = config.data instanceof FormData;

            if (!isFormData) {
                config.headers["Content-Type"] = "application/json";
                config.headers["Accept"] = "application/json";
            }
            config.headers["X-Requested-With"] = "XMLHttpRequest";

            if (!config.url?.startsWith("/auth")) {
                config.headers["Authorization"] = basicAuthHeader;
            }

            console.log(config);

            return config;

        },

        (error) => Promise.reject(error)
    );

    //----------------------------------------------------------
    // RESPONSE
    //----------------------------------------------------------
    axiosInstance.interceptors.response.use(
        (response) => response,
        async (error) => {
            const originalRequest = error.config;
            if (!originalRequest) {
                return Promise.reject(error);
            }

            //--------------------------------------------------
            // Don't retry regenerate token endpoint
            //--------------------------------------------------
            if (originalRequest.url?.includes("/auth/regenerate-token")) {
                return Promise.reject(error);
            }

            //--------------------------------------------------
            // Skip login/register
            //--------------------------------------------------
            const excludedEndpoints = [
                "/auth/login",
                "/auth/register",
            ];

            const isExcluded = excludedEndpoints.some((endpoint) =>
                originalRequest.url?.includes(endpoint)
            );

            if (isExcluded) {
                return Promise.reject(error);
            }

            //--------------------------------------------------
            // Refresh only for 401 / 419
            //--------------------------------------------------
            const status = error.response?.status;
            if ((status !== 401 && status !== 400) || originalRequest._retry) {
                return Promise.reject(error);
            }

            //--------------------------------------------------
            // Already refreshing
            //--------------------------------------------------
            if (isRefreshing) {
                return new Promise((resolve, reject) => {
                    failedQueue.push({
                        resolve,
                        reject,
                    });
                })
                .then(() => axiosInstance(originalRequest));
            }

            originalRequest._retry = true;
            isRefreshing = true;

            try {
                await axiosInstance.post("/auth/regenerate-token");
                processQueue(null);
                return axiosInstance(originalRequest);
            } catch (refreshError) {
                processQueue(refreshError);
                store.dispatch(clearAuthState());
                return Promise.reject(refreshError);
            } finally {
                isRefreshing = false;
            }
        }
    );
};

export default axiosInstance;