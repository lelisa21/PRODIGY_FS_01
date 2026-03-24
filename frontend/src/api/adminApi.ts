import axiosInstance from './axios';
import { User, DashboardStats } from '@/types/user';

export const adminApi = {
  getAllUsers: async () => {
    const response = await axiosInstance.get<{ data: User[] }>('/admin/users');
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
  },
};
