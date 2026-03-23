export interface User {
  _id: string;
  username: string;
  email: string;
  role: 'user' | 'admin';
  isActive: boolean;
  lastLogin?: string;
  createdAt: string;
  updatedAt: string;
  profile?: {
    avatar?: string;
    bio?: string;
    location?: string;
    website?: string;
  };
}

export interface AuthResponse {
  success: boolean;
  message: string;
  data: {
    user: User;
    accessToken?: string;
  };
}

export interface ApiError {
  response?: {
    data?: {
      message?: string;
      errors?: Array<{ field: string; message: string }>;
    };
    status?: number;
  };
  message: string;
}

export interface DashboardStats {
  totalUsers: number;
  activeUsers: number;
  recentUsers: User[];
  userGrowth: number;
  roleDistribution: {
    admin: number;
    user: number;
  };
}

export interface Activity {
  _id: string;
  userId: string;
  action: 'login' | 'register' | 'update_profile' | 'role_change' | 'logout';
  details: string;
  timestamp: string;
  user?: {
    username: string;
    email: string;
  };
}

export interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<boolean>;
  register: (username: string, email: string, password: string) => Promise<boolean>;
  logout: () => Promise<void>;
  refreshUser: () => Promise<void>;
}
