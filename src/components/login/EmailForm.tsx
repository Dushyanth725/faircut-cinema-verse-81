
import React from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mail } from 'lucide-react';

interface EmailFormProps {
  email: string;
  setEmail: (email: string) => void;
  handleSendOtp: () => void;
  isLoading: boolean;
}

const EmailForm: React.FC<EmailFormProps> = ({
  email,
  setEmail,
  handleSendOtp,
  isLoading
}) => {
  return (
    <div className="space-y-4">
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-purple-300 mb-1">
          Email
        </label>
        <div className="relative">
          <Input
            id="email"
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="bg-gray-900 border-purple-500 text-white pl-9"
          />
          <Mail className="absolute left-3 top-2.5 h-4 w-4 text-purple-400" />
        </div>
      </div>
      <Button 
        onClick={handleSendOtp} 
        disabled={isLoading} 
        className="w-full bg-purple-600 hover:bg-purple-700"
      >
        {isLoading ? "Sending OTP..." : "Send OTP"}
      </Button>
    </div>
  );
};

export default EmailForm;
