import axiosInstance from "./axios";
import { refreshTokenRequest } from "./authApi";

axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            try {
                const response = await refreshTokenRequest();
                
                if (response.accessToken) {
                    originalRequest.headers.Authorization = `Bearer ${response.accessToken}`;
                    return axiosInstance(originalRequest);
                }
            } catch (refreshError) {
                localStorage.removeItem('accessToken');
                delete axiosInstance.defaults.headers.common['Authorization'];
                
                if (!window.location.pathname.includes('/login')) {
                    window.location.href = '/login';
                }
                
                return Promise.reject(refreshError);
            }
        }

        return Promise.reject(error);
    }
);

export default axiosInstance;
