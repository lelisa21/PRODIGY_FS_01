// src/components/dashboard/ActivityLog.tsx
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Activity, Calendar, LogIn, UserPlus, Settings, Shield } from 'lucide-react';
import { formatDateTime, getInitials } from '@/lib/utils';
import axiosInstance from '@/api/axios';
import { Activity as ActivityType } from '@/types/user';

const getActivityIcon = (action: string) => {
  switch (action) {
    case 'login':
      return <LogIn className="h-4 w-4 text-green-600" />;
    case 'register':
      return <UserPlus className="h-4 w-4 text-blue-600" />;
    case 'update_profile':
      return <Settings className="h-4 w-4 text-purple-600" />;
    case 'role_change':
      return <Shield className="h-4 w-4 text-orange-600" />;
    default:
      return <Activity className="h-4 w-4 text-gray-600" />;
  }
};

const getActivityBadgeVariant = (action: string): "default" | "secondary" | "destructive" | "outline" => {
  switch (action) {
    case 'login':
      return 'default';
    case 'register':
      return 'secondary';
    case 'update_profile':
      return 'outline';
    case 'role_change':
      return 'destructive';
    default:
      return 'secondary';
  }
};

export const ActivityLog: React.FC = () => {
  const [activities, setActivities] = useState<ActivityType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchActivities();
  }, []);

  const fetchActivities = async () => {
    try {
      const response = await axiosInstance.get('/user/stats');
      setActivities(response.data.data);
    } catch (error) {
      console.error('Error fetching activities:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Card className="bg-white/95 backdrop-blur-sm border-white/20">
        <CardContent className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-2 border-primary-600 border-t-transparent" />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-white/95 backdrop-blur-sm border-white/20">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Activity className="h-5 w-5 text-primary-600" />
          <span>Recent Activity</span>
        </CardTitle>
        <CardDescription>Your recent account activity and actions</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map((activity) => (
            <div
              key={activity._id}
              className="flex items-start space-x-4 p-4 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors"
            >
              <Avatar className="h-10 w-10 bg-gradient-to-r from-primary-600 to-secondary-500">
                <AvatarFallback className="text-white">
                  {activity.user?.username ? getInitials(activity.user.username) : 'U'}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-1">
                  {getActivityIcon(activity.action)}
                  <p className="font-medium text-gray-900">
                    {activity.action.replace(/_/g, ' ').toUpperCase()}
                  </p>
                  <Badge variant={getActivityBadgeVariant(activity.action)} className="text-xs">
                    {activity.action}
                  </Badge>
                </div>
                <p className="text-sm text-gray-600">{activity.details}</p>
                <div className="flex items-center space-x-2 mt-2 text-xs text-gray-500">
                  <Calendar className="h-3 w-3" />
                  <span>{formatDateTime(activity.timestamp)}</span>
                </div>
              </div>
            </div>
          ))}

          {activities.length === 0 && (
            <div className="text-center py-12">
              <Activity className="h-12 w-12 mx-auto mb-3 text-gray-400" />
              <p className="text-gray-500">No activity recorded yet</p>
              <p className="text-sm text-gray-400 mt-1">Your actions will appear here</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
