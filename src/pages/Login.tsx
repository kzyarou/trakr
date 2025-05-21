
import { Sun } from 'lucide-react';
import LoginForm from '@/components/auth/LoginForm';

export default function Login() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-purple-50 flex flex-col items-center justify-center p-4">
      <div className="flex flex-col items-center mb-8">
        <div className="bg-primary rounded-full p-3 mb-4">
          <Sun className="h-10 w-10 text-white" />
        </div>
        <h1 className="text-4xl font-bold text-center tracking-tight">
          Trakr
        </h1>
        <p className="text-muted-foreground text-center mt-2">
          Take control of your finances today
        </p>
      </div>
      
      <LoginForm />
    </div>
  );
}
