
import { Sun } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { logoutUser, getCurrentUser } from '@/lib/auth';
import { useToast } from '@/hooks/use-toast';

export default function TrakrHeader() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const currentUser = getCurrentUser();

  const handleLogout = () => {
    logoutUser();
    toast({
      title: "Logged out",
      description: "You have been successfully logged out.",
    });
    navigate('/login');
  };

  return (
    <header className="bg-white border-b border-gray-200 py-3 px-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center">
          <div className="bg-primary rounded-full p-1.5 mr-2">
            <Sun className="h-5 w-5 text-white" />
          </div>
          <h1 className="text-xl font-bold text-primary">Trakr</h1>
        </div>
        
        <div className="flex items-center space-x-4">
          {currentUser && (
            <>
              <span className="text-sm hidden md:inline-block">
                Welcome, {currentUser.name}
              </span>
              <Button variant="outline" size="sm" onClick={handleLogout}>
                Sign Out
              </Button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
