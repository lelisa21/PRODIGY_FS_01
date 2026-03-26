import React from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '@/hooks/useAuth';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Mail, Calendar, Activity, Crown } from 'lucide-react';
import { getInitials, formatDate } from '@/lib/utils';
import { ProfileSettings } from '@/components/dashboard/ProfileSetting';
import { ActivityLog } from '@/components/dashboard/ActivityLog';
import { DashboardStats } from '@/components/dashboard/StatsCard';
import { UserManagement } from '@/components/dashboard/UserManagement';

const Dashboard: React.FC = () => {
  const { user } = useAuth();


  const isAdmin = user?.role === 'admin';

  // Admin Dashboard View
  if (isAdmin) {
    return (
      <div className="min-h-screen bg-[#215467]">
        <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <Card className="bg-linear-to-r from-primary-600 to-secondary-500 border-0 top-0">
              <CardContent className="px-5">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-2xl text-cyan-950">Welcome back {user?.username}! Here's your admin overview.</p>
                  </div>
                  <Badge className=" border-0">
                    <Crown className="h-4 w-4 mr-1" />
                    Administrator
                  </Badge>
                </div>
              </CardContent>
            </Card>

            {/* Admin Stats */}
            <DashboardStats />
            
            {/* User Management Table */}
            <UserManagement />
          </motion.div>
        </div>
      </div>
    );
  }

  // Regular User Dashboard View
  return (
    <div className="bg-linear-to-r from-primary-600 to-secondary-500 border-0 top-0">
      <div className="max-w-xl lg:max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
        
          <Card className="bg-linear-to-r from-primary-600 to-secondary-500  border-0">
            <CardContent className="p-2">
              <h1 className="text-2xl font-bold mb-2">Welcome back {user?.username}!</h1>
            </CardContent>
          </Card>

          {/* User Profile Card */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="lg:col-span-1 bg-white/95 backdrop-blur-sm border-white/20">
              <CardHeader className="text-center">
                <Avatar className="h-24 w-24 mx-auto bg-linear-to-r from-primary-600 to-secondary-500">
                  <AvatarFallback className=" text-2xl">
                    {user?.username ? getInitials(user.username) : 'U'}
                  </AvatarFallback>
                </Avatar>
                <CardTitle className="mt-4 bg-amber-900/56">{user?.username}</CardTitle>
                <CardDescription>{user?.email}</CardDescription>
                <Badge variant="outline" className="w-fit mx-auto mt-2">
                  {user?.role === 'admin' && <Crown className="h-3 w-3 mr-1" />}
                  {user?.role}
                </Badge>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center space-x-3 text-sm text-gray-600">
                  <Mail className="h-4 w-4" />
                  <span>{user?.email}</span>
                </div>
                {user?.lastLogin && (
                  <div className="flex items-center space-x-3 text-sm text-gray-600">
                    <Calendar className="h-4 w-4" />
                    <span>Last login: {formatDate(user.lastLogin)}</span>
                  </div>
                )}
                <div className="flex items-center space-x-3 text-sm text-gray-600">
                  <Activity className="h-4 w-4" />
                  <span>Member since: {user?.createdAt ? formatDate(user.createdAt) : 'N/A'}</span>
                </div>
              </CardContent>
            </Card>

            {/* Settings Card */}
            <Card className="lg:col-span-2 bg-white/95 backdrop-blur-sm border-white/20">
              <CardHeader>
                <CardTitle>Account Settings</CardTitle>
                <CardDescription>Manage your profile information</CardDescription>
              </CardHeader>
              <CardContent>
                <ProfileSettings />
              </CardContent>
            </Card>
          </div>

          {/* Activity Log */}
          <ActivityLog />
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard;
