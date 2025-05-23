
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { formatCurrency } from '@/utils/formatters';

interface KeyStatsProps {
  totalIncome: number;
  totalExpense: number;
  balance: number;
  averageDailySpending: number;
  currencyCode?: string;
}

const KeyStatsCards: React.FC<KeyStatsProps> = ({
  totalIncome,
  totalExpense,
  balance,
  averageDailySpending,
  currencyCode = 'USD'
}) => {
  return (
    <div className="grid gap-3 grid-cols-2 md:grid-cols-4">
      <Card>
        <CardContent className="p-3 md:p-4">
          <div className="text-xs md:text-sm font-medium text-gray-500">Income</div>
          <div className="text-lg md:text-2xl font-bold text-green-600">
            {formatCurrency(totalIncome, currencyCode)}
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="p-3 md:p-4">
          <div className="text-xs md:text-sm font-medium text-gray-500">Expenses</div>
          <div className="text-lg md:text-2xl font-bold text-red-600">
            {formatCurrency(totalExpense, currencyCode)}
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="p-3 md:p-4">
          <div className="text-xs md:text-sm font-medium text-gray-500">Balance</div>
          <div className={`text-lg md:text-2xl font-bold ${balance >= 0 ? 'text-blue-600' : 'text-red-600'}`}>
            {formatCurrency(balance, currencyCode)}
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="p-3 md:p-4">
          <div className="text-xs md:text-sm font-medium text-gray-500">Daily Avg</div>
          <div className="text-lg md:text-2xl font-bold text-purple-600">
            {formatCurrency(averageDailySpending, currencyCode)}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default KeyStatsCards;
