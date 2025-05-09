
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "@/components/ui/use-toast";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

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
    
    // In a real implementation, this would call the Supabase auth service
    // For now, we'll just simulate sending an OTP
    setTimeout(() => {
      setIsOtpSent(true);
      setIsLoading(false);
      toast({
        title: "OTP Sent",
        description: "Please check your email for the OTP",
      });
    }, 1500);
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
    
    // In a real implementation, this would verify the OTP with Supabase
    // For now, we'll just simulate verification
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Login Successful",
        description: "You have successfully logged in",
      });
      // We would navigate to the location page here
      window.location.href = '/location';
    }, 1500);
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
      window.location.href = '/admin';
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
