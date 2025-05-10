
import React from 'react';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Info } from 'lucide-react';

interface LoginAlertProps {
  title: string;
  description: string;
}

const LoginAlert: React.FC<LoginAlertProps> = ({ title, description }) => {
  return (
    <Alert className="bg-purple-900/50 border-purple-400 mb-4">
      <Info className="h-4 w-4" />
      <AlertTitle>{title}</AlertTitle>
      <AlertDescription>
        {description}
      </AlertDescription>
    </Alert>
  );
};

export default LoginAlert;
