
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import CashFlowLineChart from './CashFlowLineChart';

interface IncomeTabContentProps {
  cashFlowData: Array<{
    date: string;
    income: number;
    expense: number;
  }>;
  currencyCode?: string;
}

const IncomeTabContent: React.FC<IncomeTabContentProps> = ({ 
  cashFlowData,
  currencyCode = 'USD' 
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Income Over Time</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <CashFlowLineChart 
            data={cashFlowData} 
            showIncome={true}
            showExpense={false}
            currencyCode={currencyCode}
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default IncomeTabContent;
