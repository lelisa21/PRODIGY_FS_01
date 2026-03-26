import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, Shield, TrendingUp, UserCheck, UserX } from 'lucide-react';
import { adminApi } from '@/api/authApi';
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
    color: 'from-indigo-500 via-blue-500 to-cyan-400', 
  },
  {
    title: 'Active Users',
    value: stats.activeUsers,
    icon: UserCheck,
    description: `${((stats.activeUsers / stats.totalUsers) * 100).toFixed(1)}% of total`,
    color: 'from-emerald-500 via-teal-500 to-cyan-400', 
  },
  {
    title: 'Admins',
    value: stats.roleDistribution.admin,
    icon: Shield,
    description: `${((stats.roleDistribution.admin / stats.totalUsers) * 100).toFixed(1)}% of users`,
    color: 'from-violet-500 via-purple-500 to-fuchsia-400',  
  },
  {
    title: 'Regular Users',
    value: stats.roleDistribution.user,
    icon: UserX,
    description: 'Active community members',
    color: 'from-amber-500 via-orange-500 to-rose-400',  // Warm, engaging orange-rose (friendly community vibe)
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
