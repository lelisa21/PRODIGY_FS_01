import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

const features = [
  {
    title: 'Secure Authentication',
    description: 'JWT tokens with refresh token rotation for maximum security',
    color: 'from-blue-500 to-cyan-500',
  },
  {
    title: 'Lightning Fast',
    description: 'Optimized performance with modern authentication flows',
    color: 'from-yellow-500 to-orange-500',
  },
  {
    title: 'Role-Based Access',
    description: 'Admin and user roles with granular permissions',
    color: 'from-green-500 to-emerald-500',
  },
  {
    title: 'Session Management',
    description: 'Secure session handling with automatic token refresh',
    color: 'from-purple-500 to-pink-500',
  },
  {
    title: 'Profile Management',
    description: 'Rich user profiles with customizable settings',
    color: 'from-red-500 to-rose-500',
  },
  {
    title: 'Activity Tracking',
    description: 'Monitor user actions with comprehensive activity logs',
    color: 'from-indigo-500 to-blue-500',
  },
];

const Home: React.FC = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-[#1B2312]">
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <h1 className="text-5xl md:text-7xl font-extrabold text-white/55 mb-6">
           Verify with Confidence. 
            <span className="block text-primary-900">Scale with Security.</span>
          </h1>
          <p className="text-xl text-white/90 max-w-3xl mx-auto mb-8">
            A modern authentication system with JWT tokens, refresh tokens, role-based access, 
            and a beautiful user interface.
          </p>
          {!user ? (
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/register">
                <Button size="lg" className="bg-white text-primary-600 hover:bg-white/90">
                  Get Started
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link to="/login">
                <Button size="lg" variant="outline" className="border-white bg-amber-400 hover:bg-amber/20">
                  Sign In
                </Button>
              </Link>
            </div>
          ) : (
            <Link to="/dashboard">
              <Button size="lg" className="bg-white text-primary-600 hover:bg-white/90">
                Go to Dashboard
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          )}
        </motion.div>

        {/* Features Grid */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-20"
        >
          <h2 className="text-3xl font-bold text-center text-white mb-12">
            Features 
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
{features.map((feature, index) => {
  return (
    <motion.div
      key={index}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 + index * 0.1 }}
      className="group perspective"
    >
      <div className="relative transform-gpu transition-transform duration-500 group-hover:rotate-x-6 group-hover:rotate-y-6 group-hover:scale-105">
        <div className="bg-linear-to-br from-white to-gray-50 rounded-xl p-8 shadow-xl border border-gray-100">
          <div className="flex flex-col items-center text-center">
            <h3 className="text-lg font-bold text-gray-800 mb-2">{feature.title}</h3>
            <p className="text-gray-600 text-sm">{feature.description}</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
})}
          </div>
        </motion.div>
      </div>

      <footer className='pb-6  text-center text-amber-50'> &copy;  wellAuth{ new Date().getFullYear() }  well done.</footer>
      
    </div>
  );
};

export default Home;
