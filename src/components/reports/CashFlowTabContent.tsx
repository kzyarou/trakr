
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import CashFlowLineChart from './CashFlowLineChart';
import NetCashFlowBarChart from './NetCashFlowBarChart';

interface CashFlowTabContentProps {
  cashFlowData: Array<{
    date: string;
    income: number;
    expense: number;
  }>;
  currencyCode?: string;
}

const CashFlowTabContent: React.FC<CashFlowTabContentProps> = ({ 
  cashFlowData,
  currencyCode = 'USD'
}) => {
  return (
    <>
      {/* Cash Flow (Income vs Expenses) */}
      <Card>
        <CardHeader>
          <CardTitle>Cash Flow</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <CashFlowLineChart 
              data={cashFlowData} 
              showIncome={true}
              showExpense={true}
              currencyCode={currencyCode}
            />
          </div>
        </CardContent>
      </Card>
      
      {/* Net Cash Flow */}
      <Card>
        <CardHeader>
          <CardTitle>Net Cash Flow</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <NetCashFlowBarChart data={cashFlowData} currencyCode={currencyCode} />
          </div>
        </CardContent>
      </Card>
    </>
  );
};

export default CashFlowTabContent;
