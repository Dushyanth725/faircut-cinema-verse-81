
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "@/components/ui/use-toast";
import { supabase } from '@/services/authService';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSendOtp = async () => {
    if (!email) {
      toast({
        title: "Error",
        description: "Please enter your email address",
        variant: "destructive",
      });
      return;
    }
    
    setIsLoading(true);
    
    try {
      // Call Supabase auth API to send OTP
      const { data, error } = await supabase.auth.signInWithOtp({
        email,
        options: {
          emailRedirectTo: window.location.origin,
        }
      });

      if (error) throw error;
      
      setIsOtpSent(true);
      toast({
        title: "OTP Sent",
        description: "Please check your email for the OTP",
      });
    } catch (error) {
      console.error("Error sending OTP:", error);
      toast({
        title: "Failed to send OTP",
        description: error.message || "An unknown error occurred",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyOtp = async () => {
    if (!otp) {
      toast({
        title: "Error",
        description: "Please enter the OTP sent to your email",
        variant: "destructive",
      });
      return;
    }
    
    setIsLoading(true);
    
    try {
      // Verify OTP with Supabase
      const { data, error } = await supabase.auth.verifyOtp({
        email,
        token: otp,
        type: 'email'
      });

      if (error) throw error;

      toast({
        title: "Login Successful",
        description: "You have successfully logged in",
      });
      
      // Navigate to location page after successful login
      navigate('/location');
    } catch (error) {
      console.error("Error verifying OTP:", error);
      toast({
        title: "Verification Failed",
        description: error.message || "Invalid OTP. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleAdminLogin = () => {
    // This would be more secure in a real app
    const username = prompt("Enter admin username:");
    const password = prompt("Enter admin password:");
    
    if (username === "admin" && password === "admin123") {
      toast({
        title: "Admin Login Successful",
        description: "Redirecting to admin dashboard",
      });
      // Navigate to admin page
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
      
      <Card className="w-full max-w-md bg-black/70 border-purple-500 text-white">
        <CardHeader>
          <CardTitle className="text-2xl text-center text-purple-300">Welcome to Fair-Cut</CardTitle>
          <CardDescription className="text-center text-purple-200">
            Log in to book your movie tickets without any convenience fee
          </CardDescription>
        </CardHeader>
        <CardContent>
          {!isOtpSent ? (
            <div className="space-y-4">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-purple-300 mb-1">
                  Email
                </label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-gray-900 border-purple-500 text-white"
                />
              </div>
              <Button 
                onClick={handleSendOtp} 
                disabled={isLoading} 
                className="w-full bg-purple-600 hover:bg-purple-700"
              >
                {isLoading ? "Sending OTP..." : "Send OTP"}
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              <div>
                <label htmlFor="otp" className="block text-sm font-medium text-purple-300 mb-1">
                  Enter OTP
                </label>
                <Input
                  id="otp"
                  type="text"
                  placeholder="Enter OTP sent to your email"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  className="bg-gray-900 border-purple-500 text-white"
                />
              </div>
              <Button 
                onClick={handleVerifyOtp} 
                disabled={isLoading} 
                className="w-full bg-purple-600 hover:bg-purple-700"
              >
                {isLoading ? "Verifying..." : "Verify & Login"}
              </Button>
              <div className="text-center">
                <button 
                  onClick={() => setIsOtpSent(false)} 
                  className="text-sm text-purple-400 hover:underline"
                >
                  Change email
                </button>
              </div>
            </div>
          )}
        </CardContent>
        <CardFooter className="flex justify-center">
          <button 
            onClick={handleAdminLogin}
            className="text-sm text-purple-400 hover:underline"
          >
            Admin Login
          </button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default LoginPage;
