import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, Shield, TrendingUp, UserCheck, UserX } from 'lucide-react';
import { adminApi } from '@/api/adminApi';
import { DashboardStats as StatsType } from '@/types/user';

export const DashboardStats: React.FC = () => {
  const [stats, setStats] = useState<StatsType | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const response = await adminApi.getDashboardStats();
      setStats(response.data);
    } catch (error) {
      console.error('Error fetching stats:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 mb-8">
        {[...Array(4)].map((_, i) => (
          <Card key={i} className="bg-white/95 backdrop-blur-sm border-white/20">
            <CardContent className="p-6">
              <div className="h-20 animate-pulse bg-gray-200 rounded" />
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (!stats) return null;

  const statCards = [
    {
      title: 'Total Users',
      value: stats.totalUsers,
      icon: Users,
      description: `+${stats.userGrowth}% from last month`,
      color: 'from-blue-500 to-cyan-500',
    },
    {
      title: 'Active Users',
      value: stats.activeUsers,
      icon: UserCheck,
      description: `${((stats.activeUsers / stats.totalUsers) * 100).toFixed(1)}% of total`,
      color: 'from-green-500 to-emerald-500',
    },
    {
      title: 'Admins',
      value: stats.roleDistribution.admin,
      icon: Shield,
      description: `${((stats.roleDistribution.admin / stats.totalUsers) * 100).toFixed(1)}% of users`,
      color: 'from-purple-500 to-pink-500',
    },
    {
      title: 'Regular Users',
      value: stats.roleDistribution.user,
      icon: UserX,
      description: 'Active community members',
      color: 'from-orange-500 to-red-500',
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 mb-8">
      {statCards.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="bg-white/95 backdrop-blur-sm border-white/20 hover:shadow-xl transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">
                  {stat.title}
                </CardTitle>
                <div className={`p-2 rounded-lg bg-linear-to-r ${stat.color}`}>
                  <Icon className="h-4 w-4 text-white" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                <p className="text-xs text-gray-500 mt-1 flex items-center">
                  {stat.title === 'Total Users' && <TrendingUp className="h-3 w-3 mr-1 text-green-500" />}
                  {stat.description}
                </p>
              </CardContent>
            </Card>
          </motion.div>
        );
      })}
    </div>
  );
};
