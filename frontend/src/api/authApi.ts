import axiosInstance from './axios';
import { User, AuthResponse,DashboardStats,UsersListResponse } from '@/types/user';

export const authApi = {
    register: async (username: string, email: string, password: string) => {
        const response = await axiosInstance.post<AuthResponse>('/auth/register', {
            username,
            email,
            password
        });
        return response.data;
    },

    login: async (email: string, password: string) => {
        const response = await axiosInstance.post<AuthResponse>('/auth/login', {
            email,
            password
        });
        return response.data;
    },

    logout: async () => {
        const response = await axiosInstance.post('/auth/logout');
        return response.data;
    },

    getCurrentUser: async () => {
        const response = await axiosInstance.get<{ data: User }>('/auth/me');
        return response.data;
    },

    getDashboard: async () => {
        const response = await axiosInstance.get('/auth/dashboard');
        return response.data;
    }
};

export const adminApi = {
    getAllUsers: async () => {
        const response = await axiosInstance.get<UsersListResponse>('/admin/users');
        return response.data;  
    },

    getUserById: async (userId: string) => {
        const response = await axiosInstance.get<{ data: User }>(`/admin/users/${userId}`);
        return response.data;
    },

    deleteUser: async (userId: string) => {
        const response = await axiosInstance.delete(`/admin/users/${userId}`);
        return response.data;
    },

    changeUserRole: async (userId: string, role: 'user' | 'admin') => {
        const response = await axiosInstance.patch(`/admin/users/${userId}/role`, { role });
        return response.data;
    },

    getDashboardStats: async () => {
        const response = await axiosInstance.get<{ data: DashboardStats }>('/admin/stats');
        return response.data;
    }
};
