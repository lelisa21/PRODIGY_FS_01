import { createContext, useEffect, useState, type ReactNode } from "react";
import { type User, type AuthContextType } from "../types/user";
import { 
    getCurrentUser, 
    loginRequest, 
    logoutRequest, 
    registerRequest 
} from "../api/authApi";
import axiosInstance from "../api/axios";

export const AuthContext = createContext<AuthContextType | null>(null);

const isValidRole = (role: string): role is 'user' | 'admin' => {
    return role === 'user' || role === 'admin';
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const token = localStorage.getItem('accessToken');
                if (!token) {
                    setLoading(false);
                    return;
                }

                const response = await getCurrentUser();
                
                if (response?.data) {
                    const userData = response.data;
                    // Validate the role
                    if (userData && isValidRole(userData.role)) {
                        setUser(userData as User);
                    } else {
                        console.error('Invalid user role:', userData?.role);
                        localStorage.removeItem('accessToken');
                        setUser(null);
                    }
                } else {
                    setUser(null);
                }
            } catch (error) {
                console.error("Auth check failed:", error);
                localStorage.removeItem('accessToken');
                setUser(null);
            } finally {
                setLoading(false);
            }
        };

        checkAuth();
    }, []);

    const login = async (email: string, password: string) => {
        setLoading(true);
        setError(null);
        try {
            const response = await loginRequest(email, password);
            
            if (response?.data) {
                const userData = response.data;
                if (userData && isValidRole(userData.role)) {
                    setUser(userData as User);
                    return true;
                } else {
                    throw new Error('Invalid user role received from server');
                }
            } else {
                throw new Error('No user data received');
            }
        } catch (error: any) {
            setError(error.response?.data?.message || "Login Failed");
            return false;
        } finally {
            setLoading(false);
        }
    };

    const register = async (username: string, email: string, password: string) => {
        setLoading(true);
        setError(null);
        try {
            const response = await registerRequest(username, email, password);
            
            if (response?.data) {
                const userData = response.data;
                if (userData && isValidRole(userData.role)) {
                    setUser(userData as User);
                    return true;
                } else {
                    throw new Error('Invalid user role received from server');
                }
            } else {
                throw new Error('No user data received');
            }
        } catch (error: any) {
            setError(error.response?.data?.message || "Registration Failed");
            return false;
        } finally {
            setLoading(false);
        }
    };

    const logout = async () => {
        try {
            await logoutRequest();
            setUser(null);
            localStorage.removeItem('accessToken');
            // Clear any authorization headers
            delete axiosInstance.defaults.headers.common['Authorization'];
        } catch (error) {
            console.error("Logout error:", error);
        }
    };

    const refreshUser = async () => {
        try {
            const response = await getCurrentUser();
            if (response?.data) {
                const userData = response.data;
                if (userData && isValidRole(userData.role)) {
                    setUser(userData as User);
                }
            }
        } catch (error) {
            console.error("Refresh user failed:", error);
        }
    };

    const value: AuthContextType = {
        user,
        login,
        register,
        logout,
        loading,
        error,
        refreshUser
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};
