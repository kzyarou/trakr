
import React from 'react';
import { HomeIcon, BarChart2Icon, PlusIcon, ListIcon, WalletIcon, PieChartIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface MobileNavbarProps {
  currentPage: string;
  onNavigate: (page: string) => void;
  onAddTransaction: () => void;
}

const MobileNavbar: React.FC<MobileNavbarProps> = ({
  currentPage,
  onNavigate,
  onAddTransaction
}) => {
  const navItems = [
    { id: 'dashboard', label: 'Home', icon: HomeIcon },
    { id: 'transactions', label: 'Trans', icon: ListIcon },
    { id: 'add', label: 'Add', icon: PlusIcon, action: onAddTransaction },
    { id: 'budgets', label: 'Budgets', icon: PieChartIcon },
    { id: 'reports', label: 'Reports', icon: BarChart2Icon }
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-background border-t border-border px-2 py-2 z-50">
      <div className="flex items-center justify-between">
        {navItems.map((item) => (
          <button
            key={item.id}
            className={cn(
              "flex flex-col items-center justify-center py-1 px-3 rounded-lg transition-colors",
              currentPage === item.id 
                ? "text-primary" 
                : "text-muted-foreground hover:text-foreground"
            )}
            onClick={() => item.action ? item.action() : onNavigate(item.id)}
          >
            <item.icon className="h-5 w-5" />
            <span className="text-xs mt-1">{item.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default MobileNavbar;
