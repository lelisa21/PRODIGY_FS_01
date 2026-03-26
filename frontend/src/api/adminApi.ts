import axiosInstance from './axios';
import { User, DashboardStats,UsersListResponse } from '@/types/user';

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
