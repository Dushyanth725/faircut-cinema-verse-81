
import React, { useState } from 'react';
import { toast } from "@/components/ui/use-toast";
import { signInWithEmail, verifyOtp } from '@/services/authService';
import { useNavigate } from 'react-router-dom';
import LoginCard from '@/components/login/LoginCard';

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
      // Call auth service to send OTP
      const result = await signInWithEmail(email);

      if (!result.success) {
        throw new Error(result.error?.message || "Failed to send OTP");
      }
      
      setIsOtpSent(true);
      toast({
        title: "OTP Sent",
        description: "A 6-digit OTP has been sent to your email. Please check your inbox.",
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
    if (!otp || otp.length !== 6) {
      toast({
        title: "Error",
        description: "Please enter the complete 6-digit OTP",
        variant: "destructive",
      });
      return;
    }
    
    setIsLoading(true);
    
    try {
      // Verify OTP with auth service
      const result = await verifyOtp(email, otp);

      if (!result.success) {
        throw new Error(result.error?.message || "Invalid OTP");
      }

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
      
      <LoginCard 
        email={email}
        setEmail={setEmail}
        otp={otp}
        setOtp={setOtp}
        isOtpSent={isOtpSent}
        setIsOtpSent={setIsOtpSent}
        isLoading={isLoading}
        handleSendOtp={handleSendOtp}
        handleVerifyOtp={handleVerifyOtp}
        handleAdminLogin={handleAdminLogin}
      />
    </div>
  );
};

export default LoginPage;
