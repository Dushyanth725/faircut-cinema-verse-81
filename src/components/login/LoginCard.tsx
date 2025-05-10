
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import LoginAlert from './LoginAlert';
import EmailForm from './EmailForm';
import OtpVerificationForm from './OtpVerificationForm';

interface LoginCardProps {
  email: string;
  setEmail: (email: string) => void;
  otp: string;
  setOtp: (otp: string) => void;
  isOtpSent: boolean;
  setIsOtpSent: (isOtpSent: boolean) => void;
  isLoading: boolean;
  handleSendOtp: () => void;
  handleVerifyOtp: () => void;
  handleAdminLogin: () => void;
}

const LoginCard: React.FC<LoginCardProps> = ({
  email,
  setEmail,
  otp,
  setOtp,
  isOtpSent,
  setIsOtpSent,
  isLoading,
  handleSendOtp,
  handleVerifyOtp,
  handleAdminLogin
}) => {
  return (
    <Card className="w-full max-w-md bg-black/70 border-purple-500 text-white">
      <CardHeader>
        <CardTitle className="text-2xl text-center text-purple-300">Welcome to Fair-Cut</CardTitle>
        <CardDescription className="text-center text-purple-200">
          Log in to book your movie tickets without any convenience fee
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {isOtpSent ? (
          <LoginAlert 
            title="Check your email" 
            description="A 6-digit OTP has been sent to your email address. If you don't see it, please check your spam folder." 
          />
        ) : (
          <LoginAlert 
            title="Test Login" 
            description="For testing, you can use admin login with username: &quot;admin&quot; and password: &quot;admin123&quot;." 
          />
        )}
        
        {!isOtpSent ? (
          <EmailForm 
            email={email}
            setEmail={setEmail}
            handleSendOtp={handleSendOtp}
            isLoading={isLoading}
          />
        ) : (
          <OtpVerificationForm 
            otp={otp}
            setOtp={setOtp}
            handleVerifyOtp={handleVerifyOtp}
            isLoading={isLoading}
            onChangeEmail={() => setIsOtpSent(false)}
          />
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
  );
};

export default LoginCard;
