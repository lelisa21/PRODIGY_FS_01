import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const Home = () => {
    const { user } = useAuth();

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
          
            <nav className="bg-white shadow-lg">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16">
                        <div className="flex items-center">
                            <h1 className="text-2xl font-bold text-indigo-600">AuthApp</h1>
                        </div>
                        <div className="flex items-center space-x-4">
                            {user ? (
                                <>
                                    <Link
                                        to="/dashboard"
                                        className="text-gray-700 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium"
                                    >
                                        Dashboard
                                    </Link>
                                    <span className="text-gray-500">|</span>
                                    <span className="text-gray-700">
                                        Welcome, {user.username}
                                        {user.role === 'admin' && (
                                            <span className="ml-2 px-2 py-1 text-xs bg-purple-100 text-purple-800 rounded-full">
                                                Admin
                                            </span>
                                        )}
                                    </span>
                                </>
                            ) : (
                                <>
                                    <Link
                                        to="/login"
                                        className="text-gray-700 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium"
                                    >
                                        Login
                                    </Link>
                                    <Link
                                        to="/register"
                                        className="bg-indigo-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-indigo-700"
                                    >
                                        Get Started
                                    </Link>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                <div className="text-center">
                    <h2 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
                        <span className="block">Secure Authentication</span>
                        <span className="block text-indigo-600">Made Simple</span>
                    </h2>
                    <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
                        A modern authentication system with JWT tokens, refresh tokens, role-based access, and a beautiful UI.
                    </p>
                    
                    {/* Features Grid */}
                    <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
                        <div className="bg-white rounded-lg shadow-lg p-6">
                            <div className="text-indigo-600 text-2xl mb-4">🔐</div>
                            <h3 className="text-lg font-semibold mb-2">Secure Authentication</h3>
                            <p className="text-gray-600">JWT with refresh tokens for maximum security</p>
                        </div>
                        <div className="bg-white rounded-lg shadow-lg p-6">
                            <div className="text-indigo-600 text-2xl mb-4">👥</div>
                            <h3 className="text-lg font-semibold mb-2">Role-Based Access</h3>
                            <p className="text-gray-600">User and Admin roles with different permissions</p>
                        </div>
                        <div className="bg-white rounded-lg shadow-lg p-6">
                            <div className="text-indigo-600 text-2xl mb-4">🔄</div>
                            <h3 className="text-lg font-semibold mb-2">Session Management</h3>
                            <p className="text-gray-600">Automatic token refresh and session handling</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;
