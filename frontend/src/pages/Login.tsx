import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import {  Loader2 } from 'lucide-react';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, isLoading, error } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const success = await login(email, password);
    if (success) {
      navigate('/dashboard');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-primary-600 to-secondary-500 p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        className="w-full max-w-md"
      >
        <Card className="bg-white/95 backdrop-blur-sm border-white/20 shadow-xl">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold">Welcome Back</CardTitle>
            <CardDescription>Sign in to your account</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <div className="relative">
                  <Input
                    id="email"
                    type="email"
                    placeholder="laloo@gmail.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="mt-1 w-full px-4 py-5 border rounded-md focus:ring-0.5 focus:ring-[#185a9d] focus:outline-none border-b-2 border-[#185a9d]"
                    required
                    disabled={isLoading}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className=" mt-1 w-full px-4 py-5 border rounded-md focus:ring-0.5 focus:ring-[#185a9d] focus:outline-none border-b-2 border-[#185a9d]"
                    required
                    disabled={isLoading}
                  />
                </div>
              </div>

              {error && (
                <Alert variant="destructive">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <Button
                type="submit"
                className="w-full bg-linear-to-r from-primary-600 to-secondary-500 hover:opacity-90"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Signing in...
                  </>
                ) : (
                  'Sign In'
                )}
              </Button>

              <p className="text-center text-sm text-gray-600">
                Don't have an account?{' '}
                <Link to="/register" className="text-primary-600 hover:underline font-medium">
                  Create an account
                </Link>
              </p>
            </form>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default Login;































// import { useNavigate } from "react-router-dom";
// import { useAuth } from "../hooks/useAuth";
// import { useState } from "react";

// const Login = () => {
//   const { error, isLoading, login } = useAuth();
//   const navigate = useNavigate();

//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     const success = await login(email, password);
//     if (success) navigate("/dashboard");
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-100">
      
//       <form
//         onSubmit={handleSubmit}
//         className="bg-white p-8 rounded shadow-md w-full max-w-md space-y-9"
//       >
//         <h2 className="text-2xl font-bold text-center text-gray-800">
//           Login to your account
//         </h2>
//         {/* {username} */}
  
//             <div></div>
//         {/* Email */}
//         <div>
//           <label className="block text-sm font-medium text-gray-600">
//             Email
//           </label>
//           <input
//             type="email"
//             placeholder="laloo@gmail.com"
//             autoComplete="email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             className="mt-1 w-full px-4 py-2 border rounded-md focus:ring-0.5 focus:ring-[#185a9d] focus:outline-none border-b-2 border-[#185a9d]"
//             required
//           />
//         </div>

//         {/* Password */}
//         <div>
//           <label className="block text-sm font-medium text-gray-600">
//             Password
//           </label>
//           <input
//             type="password"
//             placeholder="••••••••"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             className="mt-1 w-full px-4 py-2 border rounded-md focus:ring-0.5 focus:ring-[#185a9d] focus:outline-none border-b-2 border-[#185a9d]"
//             required
//           />
//         </div>

//         {/* Error */}
//         {error && (
//           <p className="text-red-500 text-sm text-center">{error}</p>
//         )}

//         {/* Button */}
//         <button
//           disabled={loading}
//           className="w-full bg-[#185a9d] text-white py-2 rounded-lg hover:bg-[#185a9d]/90 transition disabled:opacity-50"
//         >
//           {loading ? "Logging in..." : "Login"}
//         </button>

//         <p className="text-sm text-center text-gray-500">
//           Don't have an account?{" "}
//           <span
//             className="text-[#185a9d] cursor-pointer"
//             onClick={() => navigate("/register")}
//           >
//             Register
//           </span>
//         </p>
//       </form>
//     </div>
//   );
// };

// export default Login;
