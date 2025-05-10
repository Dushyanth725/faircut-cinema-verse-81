
import React from 'react';
import { Button } from "@/components/ui/button";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";

interface OtpVerificationFormProps {
  otp: string;
  setOtp: (otp: string) => void;
  handleVerifyOtp: () => void;
  isLoading: boolean;
  onChangeEmail: () => void;
}

const OtpVerificationForm: React.FC<OtpVerificationFormProps> = ({
  otp,
  setOtp,
  handleVerifyOtp,
  isLoading,
  onChangeEmail
}) => {
  return (
    <div className="space-y-4">
      <div>
        <label htmlFor="otp" className="block text-sm font-medium text-purple-300 mb-1">
          Enter 6-digit OTP
        </label>
        <div className="flex justify-center my-4">
          <InputOTP maxLength={6} value={otp} onChange={setOtp}>
            <InputOTPGroup>
              <InputOTPSlot index={0} className="bg-gray-900 border-purple-500" />
              <InputOTPSlot index={1} className="bg-gray-900 border-purple-500" />
              <InputOTPSlot index={2} className="bg-gray-900 border-purple-500" />
              <InputOTPSlot index={3} className="bg-gray-900 border-purple-500" />
              <InputOTPSlot index={4} className="bg-gray-900 border-purple-500" />
              <InputOTPSlot index={5} className="bg-gray-900 border-purple-500" />
            </InputOTPGroup>
          </InputOTP>
        </div>
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
          onClick={onChangeEmail} 
          className="text-sm text-purple-400 hover:underline"
        >
          Change email
        </button>
      </div>
    </div>
  );
};

export default OtpVerificationForm;
