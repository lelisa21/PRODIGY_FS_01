import axiosInstance from "./axios";

export interface LoginResponse {
    success: boolean;
    accessToken: string;
    data: {
        _id: string;
        username: string;
        email: string;
        role: string;
        createdAt: string;
        updatedAt: string;
    };
}

export const loginRequest = async (email: string, password: string) => {
    const { data } = await axiosInstance.post<LoginResponse>("/auth/login", {
        email,
        password
    });
    
    if (data.accessToken) {
        localStorage.setItem('accessToken', data.accessToken);
    }
    
    return data;
};

export const registerRequest = async (username: string, email: string, password: string) => {
    const { data } = await axiosInstance.post<LoginResponse>("/auth/register", {
        username,
        email,
        password
    });
    
    if (data.accessToken) {
        localStorage.setItem('accessToken', data.accessToken);
    }
    
    return data;
};

export const logoutRequest = async () => {
    await axiosInstance.post("/auth/logout");
    localStorage.removeItem('accessToken');
};

export const getCurrentUser = async () => {
    const { data } = await axiosInstance.get("/auth/me");
    return data;
};

export const refreshTokenRequest = async () => {
    const { data } = await axiosInstance.post("/auth/refresh-token");
    if (data.accessToken) {
        localStorage.setItem('accessToken', data.accessToken);
    }
    return data;
};
