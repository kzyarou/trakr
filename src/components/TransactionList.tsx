
import React from 'react';
import { Transaction } from '@/lib/types';
import { formatDistanceToNow } from 'date-fns';
import { ArrowUpRight, ArrowDownLeft, Trash2, MoreHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';

interface TransactionListProps {
  transactions: Transaction[];
  onDeleteTransaction: (id: string) => void;
  formatCurrency?: (value: number) => string;
}

const TransactionList: React.FC<TransactionListProps> = ({ 
  transactions, 
  onDeleteTransaction,
  formatCurrency 
}) => {
  // Default formatter if none provided
  const formatAmount = formatCurrency || ((amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  });

  if (transactions.length === 0) {
    return (
      <Card className="p-6 text-center">
        <p className="text-muted-foreground">No transactions yet.</p>
      </Card>
    );
  }

  return (
    <div className="space-y-3">
      {transactions.map(transaction => (
        <Card key={transaction.id} className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className={`h-10 w-10 rounded-full flex items-center justify-center ${
                transaction.type === 'income' ? 'bg-green-100 dark:bg-green-900' : 'bg-red-100 dark:bg-red-900'
              }`}>
                {transaction.type === 'income' ? (
                  <ArrowUpRight className={`h-5 w-5 text-green-600 dark:text-green-400`} />
                ) : (
                  <ArrowDownLeft className={`h-5 w-5 text-red-600 dark:text-red-400`} />
                )}
              </div>
              
              <div className="space-y-1">
                <p className="font-medium line-clamp-1">{transaction.description}</p>
                <p className="text-xs text-muted-foreground">
                  {transaction.category} • {formatDistanceToNow(new Date(transaction.date), { addSuffix: true })}
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <span className={`font-medium ${
                transaction.type === 'income' ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
              }`}>
                {transaction.type === 'income' ? '+' : '-'}{formatAmount(transaction.amount)}
              </span>
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <MoreHorizontal className="h-4 w-4" />
                    <span className="sr-only">Open menu</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem 
                    className="text-red-600 dark:text-red-400 focus:text-red-600 dark:focus:text-red-400"
                    onClick={() => onDeleteTransaction(transaction.id)}
                  >
                    <Trash2 className="mr-2 h-4 w-4" />
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default TransactionList;
