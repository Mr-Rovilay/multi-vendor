/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Mail, Lock, Eye, EyeOff, Loader2 } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { loginSchema } from '../zod-schema/auth';
import axios from "axios";
import { server } from "@/server";
import { toast } from "sonner";

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate()

  const form = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: ''
    }
  });

  const onSubmit = async (data) => {
    setIsLoading(true); // Set loading state to true
  
    try {
      const response = await axios.post(`${server}/auth/login`, data, {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true, // This should be passed here for cookies, not in localStorage
      });
  
      const { token, user } = response.data;
  
      // Store the token in localStorage correctly
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
  
      // Notify the user and navigate to the homepage
      toast.success('Login successful');
      navigate('/');
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || 'An error occurred. Please try again.';
      toast.error(errorMessage);
    } finally {
      setIsLoading(false); // Reset loading state
    }
  };
  

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Card className="w-full max-w-md">
        <CardHeader className="justify-center text-center">
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
                          disabled={isLoading}
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
                          disabled={isLoading}
                        />
                        <button
                          type="button"
                          onClick={togglePasswordVisibility}
                          className="absolute text-gray-400 transform -translate-y-1/2 right-3 top-1/2"
                          disabled={isLoading}
                        >
                          {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                        </button>
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
                disabled={isLoading}
              >
                {isLoading ? (
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