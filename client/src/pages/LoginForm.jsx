import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Mail, Lock, Eye, EyeOff, Loader2 } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { loginSchema } from '../zod-schema/auth';
import { toast } from "sonner";
import axios from 'axios';
import { server } from '@/server';

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const form = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: ''
    }
  });

  const { isSubmitting } = form.formState;

  const onSubmit = async (data) => {
    try {
      // Make login request
      const response = await axios.post(`${server}/auth/login`, data);
      
      // Extract token and user info from response
      const { token, user } = response.data;

      // Store token in localStorage
      localStorage.setItem('userToken', token);
      
      // Store user info in localStorage
      localStorage.setItem('userInfo', JSON.stringify(user));

      // Optional: Store token in axios defaults for future requests
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

      toast.success('Login successful');
      navigate('/'); // Redirect to dashboard or home page
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'An error occurred. Please try again.';
      toast.error(errorMessage);
    }
  };

  // // Function to retrieve token
  // const getToken = () => {
  //   return localStorage.getItem('userToken');
  // };

  // // Function to retrieve user info
  // const getUserInfo = () => {
  //   const userInfo = localStorage.getItem('userInfo');
  //   return userInfo ? JSON.parse(userInfo) : null;
  // };

  // // Function to logout
  // const logout = () => {
  //   localStorage.removeItem('userToken');
  //   localStorage.removeItem('userInfo');
  //   delete axios.defaults.headers.common['Authorization'];
  //   navigate('/login');
  // };

  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle>Login</CardTitle>
          <CardDescription>Enter your credentials to access your account</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Mail className="absolute text-gray-400 transform -translate-y-1/2 left-3 top-1/2" size={20} />
                        <Input 
                          {...field} 
                          type="email" 
                          placeholder="your-email@example.com" 
                          className="pl-10"
                          autoComplete="email" 
                          disabled={isSubmitting}
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Lock className="absolute text-gray-400 transform -translate-y-1/2 left-3 top-1/2" size={20} />
                        <Input 
                          {...field} 
                          type={showPassword ? 'text' : 'password'}
                          placeholder="Enter your password" 
                          className="pl-10 pr-10"
                          autoComplete="current-password" 
                          disabled={isSubmitting}
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="absolute top-0 right-0 h-full px-3"
                          onClick={togglePasswordVisibility}
                          disabled={isSubmitting}
                        >
                          {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                        </Button>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex items-center justify-between">
                <Link 
                  to="/forgot-password" 
                  className="text-sm text-blue-600 hover:underline"
                >
                  Forgot your password?
                </Link>
              </div>
              <Button 
                type="submit" 
                className="w-full" 
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Logging in...
                  </>
                ) : (
                  'Login'
                )}
              </Button>
              
              <div className="mt-4 text-center">
                <span className="text-sm text-gray-600">
                  Don&#39;t have an account? {' '}
                  <Link 
                    to="/signup" 
                    className="text-blue-600 hover:underline"
                  >
                    Sign up
                  </Link>
                </span>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}