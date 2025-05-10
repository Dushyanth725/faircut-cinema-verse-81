
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/components/ui/use-toast";
import { Mail, Lock, LogIn } from "lucide-react";
import { useNavigate } from 'react-router-dom';
import { signInWithEmail, signUpWithEmail } from '@/services/authService';

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const navigate = useNavigate();

  const handleAuthentication = async () => {
    if (!email || !password) {
      toast({
        title: "Error",
        description: "Please enter both email and password",
        variant: "destructive",
      });
      return;
    }
    
    setIsLoading(true);
    
    try {
      // Call auth service to sign in or sign up
      const result = isSignUp 
        ? await signUpWithEmail(email, password)
        : await signInWithEmail(email, password);

      if (!result.success) {
        throw new Error(result.error?.message || "Authentication failed");
      }
      
      toast({
        title: isSignUp ? "Sign Up Successful" : "Login Successful",
        description: isSignUp 
          ? "Your account has been created" 
          : "You have successfully logged in",
      });
      
      // Navigate to location page after successful login
      navigate('/location');
    } catch (error) {
      console.error("Authentication error:", error);
      toast({
        title: "Authentication Failed",
        description: error.message || "An unknown error occurred",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleAdminLogin = () => {
    const username = prompt("Enter admin username:");
    const password = prompt("Enter admin password:");
    
    if (username === "admin" && password === "admin123") {
      toast({
        title: "Admin Login Successful",
        description: "Redirecting to admin dashboard",
      });
      navigate('/admin');
    } else {
      toast({
        title: "Login Failed",
        description: "Invalid admin credentials",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-purple-900 via-violet-800 to-purple-900 p-4">
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-bold text-white mb-2">Fair-Cut</h1>
        <p className="text-purple-200">Convenience cost-free movie tickets</p>
      </div>
      
      <Card className="w-full max-w-md bg-black/70 border-purple-500">
        <CardHeader>
          <CardTitle className="text-center text-white">
            {isSignUp ? "Create Account" : "Welcome Back"}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email" className="text-purple-300">Email</Label>
            <div className="relative">
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="bg-gray-900 border-purple-500 text-white pl-9"
              />
              <Mail className="absolute left-3 top-2.5 h-4 w-4 text-purple-400" />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="password" className="text-purple-300">Password</Label>
            <div className="relative">
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="bg-gray-900 border-purple-500 text-white pl-9"
              />
              <Lock className="absolute left-3 top-2.5 h-4 w-4 text-purple-400" />
            </div>
          </div>
          
          <Button 
            onClick={handleAuthentication} 
            disabled={isLoading} 
            className="w-full bg-purple-600 hover:bg-purple-700"
          >
            <LogIn className="mr-2 h-4 w-4" />
            {isLoading ? "Processing..." : (isSignUp ? "Sign Up" : "Login")}
          </Button>
          
          <div className="text-center">
            <button 
              type="button"
              onClick={() => setIsSignUp(!isSignUp)} 
              className="text-purple-400 text-sm hover:text-purple-300"
            >
              {isSignUp 
                ? "Already have an account? Login" 
                : "Don't have an account? Sign Up"}
            </button>
          </div>
          
          <div className="pt-4 text-center border-t border-purple-800">
            <button 
              type="button"
              onClick={handleAdminLogin}
              className="text-purple-400 text-sm hover:text-purple-300"
            >
              Admin Login
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default LoginPage;
