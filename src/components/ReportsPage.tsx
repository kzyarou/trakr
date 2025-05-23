
import React, { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Transaction } from '@/lib/types';
import { 
  getFilteredTransactions, 
  getSpendingByCategory, 
  getSpendingOverTime, 
  getSpendingByPaymentMethod, 
  calculateStatistics 
} from '@/utils/reportHelpers';

// Import all the component parts
import TimeRangeSelector from './reports/TimeRangeSelector';
import KeyStatsCards from './reports/KeyStatsCards';
import SpendingTabContent from './reports/SpendingTabContent';
import IncomeTabContent from './reports/IncomeTabContent';
import CashFlowTabContent from './reports/CashFlowTabContent';

interface ReportsPageProps {
  transactions: Transaction[];
}

const ReportsPage: React.FC<ReportsPageProps> = ({ transactions }) => {
  const [timeRange, setTimeRange] = useState<'seven_days' | '30days' | '90days' | 'year'>('30days');
  const [reportType, setReportType] = useState<'spending' | 'income' | 'cashflow'>('spending');
  // Get currency from localStorage (with default fallback)
  const currencyCode = localStorage.getItem('currency') || 'USD';
  
  // Filter and process the data
  const filteredTransactions = getFilteredTransactions(transactions, timeRange);
  const spendingByCategory = getSpendingByCategory(filteredTransactions);
  const spendingOverTime = getSpendingOverTime(filteredTransactions);
  const spendingByPaymentMethod = getSpendingByPaymentMethod(filteredTransactions);
  const stats = calculateStatistics(filteredTransactions);

  return (
    <div className="space-y-4 md:space-y-6">
      {/* Time Range Selector */}
      <TimeRangeSelector timeRange={timeRange} setTimeRange={setTimeRange} />

      {/* Key Statistics */}
      <KeyStatsCards 
        totalIncome={stats.totalIncome}
        totalExpense={stats.totalExpense}
        balance={stats.balance}
        averageDailySpending={stats.averageDailySpending}
        currencyCode={currencyCode}
      />

      {/* Report Type Tabs */}
      <Tabs defaultValue={reportType} onValueChange={(value) => setReportType(value as any)}>
        <TabsList className="mb-4 w-full overflow-x-auto no-scrollbar">
          <TabsTrigger value="spending">Spending</TabsTrigger>
          <TabsTrigger value="income">Income</TabsTrigger>
          <TabsTrigger value="cashflow">Cash Flow</TabsTrigger>
        </TabsList>
        
        <TabsContent value="spending" className="space-y-4 md:space-y-6">
          <SpendingTabContent 
            spendingByCategory={spendingByCategory}
            spendingByPaymentMethod={spendingByPaymentMethod}
            currencyCode={currencyCode}
          />
        </TabsContent>
        
        <TabsContent value="income" className="space-y-4 md:space-y-6">
          <IncomeTabContent 
            cashFlowData={spendingOverTime}
            currencyCode={currencyCode}
          />
        </TabsContent>
        
        <TabsContent value="cashflow" className="space-y-4 md:space-y-6">
          <CashFlowTabContent 
            cashFlowData={spendingOverTime}
            currencyCode={currencyCode}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ReportsPage;
