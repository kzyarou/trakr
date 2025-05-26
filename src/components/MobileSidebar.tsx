
import React from 'react';
import { Moon, Sun, Settings, Lightbulb, BarChart2, HelpCircle } from 'lucide-react';
import { useTheme } from '@/hooks/use-theme';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

interface MobileSidebarProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onNavigate: (page: string) => void;
}

const MobileSidebar: React.FC<MobileSidebarProps> = ({ open, onOpenChange, onNavigate }) => {
  const { theme, setTheme } = useTheme();

  const handleNavigate = (page: string) => {
    onNavigate(page);
    onOpenChange(false);
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="left" className="w-[300px] sm:w-[350px] p-0">
        <SheetHeader className="p-4 border-b">
          <SheetTitle>Menu</SheetTitle>
        </SheetHeader>
        
        <div className="flex flex-col p-4 h-full overflow-auto">
          <div className="space-y-2">            
            <Button 
              variant="ghost" 
              className="w-full justify-start" 
              onClick={() => handleNavigate('tools')}
            >
              <Lightbulb className="mr-2 h-5 w-5" />
              Mini Tools
            </Button>
            
            <Button 
              variant="ghost" 
              className="w-full justify-start" 
              onClick={() => handleNavigate('reports')}
            >
              <BarChart2 className="mr-2 h-5 w-5" />
              Reports
            </Button>
            
            <Button 
              variant="ghost" 
              className="w-full justify-start" 
              onClick={() => handleNavigate('settings')}
            >
              <Settings className="mr-2 h-5 w-5" />
              Settings
            </Button>

            <Button 
              variant="ghost" 
              className="w-full justify-start" 
              onClick={() => handleNavigate('help')}
            >
              <HelpCircle className="mr-2 h-5 w-5" />
              Help & Features
            </Button>
            
            <Button
              variant="ghost"
              className="w-full justify-start"
              onClick={() => setTheme(theme === "light" ? "dark" : "light")}
            >
              {theme === "light" ? (
                <>
                  <Moon className="mr-2 h-5 w-5" />
                  Dark Mode
                </>
              ) : (
                <>
                  <Sun className="mr-2 h-5 w-5" />
                  Light Mode
                </>
              )}
            </Button>
          </div>
          
          <Separator className="my-4" />
          
          <div className="space-y-2">
            <h3 className="text-xs font-medium mb-2">New Features</h3>
            
            <Button 
              size="sm" 
              variant="ghost" 
              className="w-full justify-start text-sm h-8" 
              onClick={() => handleNavigate('personality-quiz')}
            >
              Personality Quiz
            </Button>
            
            <Button 
              size="sm" 
              variant="ghost" 
              className="w-full justify-start text-sm h-8"
              onClick={() => handleNavigate('streaks')}
            >
              Behavioral Streaks
            </Button>
            
            <Button 
              size="sm" 
              variant="ghost" 
              className="w-full justify-start text-sm h-8"
              onClick={() => handleNavigate('shame-free')}
            >
              Shame-Free Mode
            </Button>
            
            <Button 
              size="sm" 
              variant="ghost" 
              className="w-full justify-start text-sm h-8"
              onClick={() => handleNavigate('gamified')}
            >
              Gamified Features
            </Button>
            
            <Button 
              size="sm" 
              variant="ghost" 
              className="w-full justify-start text-sm h-8"
              onClick={() => handleNavigate('mindful')}
            >
              Mindful Add-Ons
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MobileSidebar;
