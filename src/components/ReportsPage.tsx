
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  LineChart, 
  BarChart,
  Line, 
  Bar,
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { Transaction, TransactionType } from '@/lib/types';
import { format, subDays, startOfMonth, endOfMonth, isWithinInterval, differenceInDays } from 'date-fns';
import { defaultCategories } from '@/lib/data';

interface ReportsPageProps {
  transactions: Transaction[];
}

const CHART_COLORS = [
  '#3182CE', // blue
  '#38A169', // green
  '#E53E3E', // red
  '#805AD5', // purple
  '#DD6B20', // orange
  '#38B2AC', // teal
  '#D69E2E', // yellow
  '#667EEA', // indigo
  '#F56565', // light red
  '#48BB78', // light green
];

const ReportsPage: React.FC<ReportsPageProps> = ({ transactions }) => {
  const [timeRange, setTimeRange] = useState<'7days' | '30days' | '90days' | 'year'>('30days');
  const [reportType, setReportType] = useState<'spending' | 'income' | 'cashflow'>('spending');

  // Filter transactions by time range
  const getFilteredTransactions = () => {
    const today = new Date();
    let startDate: Date;
    
    switch (timeRange) {
      case '7days':
        startDate = subDays(today, 7);
        break;
      case '30days':
        startDate = subDays(today, 30);
        break;
      case '90days':
        startDate = subDays(today, 90);
        break;
      case 'year':
        startDate = subDays(today, 365);
        break;
      default:
        startDate = subDays(today, 30);
    }
    
    return transactions.filter(tx => new Date(tx.date) >= startDate);
  };

  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0
    }).format(amount);
  };

  // Get spending by category for pie chart
  const getSpendingByCategory = () => {
    const filtered = getFilteredTransactions().filter(tx => tx.type === 'expense');
    const categoryTotals: { [key: string]: number } = {};
    
    filtered.forEach(tx => {
      if (!categoryTotals[tx.category]) {
        categoryTotals[tx.category] = 0;
      }
      categoryTotals[tx.category] += tx.amount;
    });
    
    return Object.entries(categoryTotals).map(([categoryId, amount]) => {
      const category = defaultCategories.find(c => c.id === categoryId);
      return {
        name: category ? category.name : categoryId,
        value: amount,
        color: category ? category.color : '#CBD5E0',
      };
    }).sort((a, b) => b.value - a.value);
  };

  // Get spending over time for line chart
  const getSpendingOverTime = () => {
    const filtered = getFilteredTransactions();
    const days = differenceInDays(new Date(), filtered.length > 0 
      ? new Date(Math.min(...filtered.map(tx => new Date(tx.date).getTime())))
      : subDays(new Date(), 30));
    
    // Group data by days, weeks, or months depending on time range
    let groupBy: 'day' | 'week' | 'month' = 'day';
    if (days > 60) {
      groupBy = 'month';
    } else if (days > 14) {
      groupBy = 'week';
    }
    
    const data: { [key: string]: { date: string, expense: number, income: number } } = {};
    
    filtered.forEach(tx => {
      const date = new Date(tx.date);
      let key: string;
      
      if (groupBy === 'day') {
        key = format(date, 'yyyy-MM-dd');
      } else if (groupBy === 'week') {
        const weekNum = Math.ceil(date.getDate() / 7);
        key = `${format(date, 'MMM')} W${weekNum}`;
      } else {
        key = format(date, 'MMM yyyy');
      }
      
      if (!data[key]) {
        data[key] = { date: key, expense: 0, income: 0 };
      }
      
      if (tx.type === 'expense') {
        data[key].expense += tx.amount;
      } else {
        data[key].income += tx.amount;
      }
    });
    
    return Object.values(data).sort((a, b) => {
      // Sort by date
      const dateA = new Date(a.date.replace('W', ''));
      const dateB = new Date(b.date.replace('W', ''));
      return dateA.getTime() - dateB.getTime();
    });
  };

  // Get spending by payment method for bar chart
  const getSpendingByPaymentMethod = () => {
    const filtered = getFilteredTransactions().filter(tx => tx.type === 'expense');
    const methodTotals: { [key: string]: number } = {};
    
    filtered.forEach(tx => {
      if (!methodTotals[tx.paymentMethod]) {
        methodTotals[tx.paymentMethod] = 0;
      }
      methodTotals[tx.paymentMethod] += tx.amount;
    });
    
    return Object.entries(methodTotals)
      .map(([method, amount]) => ({
        name: method,
        amount
      }))
      .sort((a, b) => b.amount - a.amount);
  };

  const calculateStatistics = () => {
    const filtered = getFilteredTransactions();
    
    const totalIncome = filtered
      .filter(tx => tx.type === 'income')
      .reduce((sum, tx) => sum + tx.amount, 0);
      
    const totalExpense = filtered
      .filter(tx => tx.type === 'expense')
      .reduce((sum, tx) => sum + tx.amount, 0);
      
    const balance = totalIncome - totalExpense;
    
    // Average daily spending
    const uniqueDates = new Set(filtered
      .filter(tx => tx.type === 'expense')
      .map(tx => format(new Date(tx.date), 'yyyy-MM-dd')));
    
    const averageDailySpending = uniqueDates.size > 0 
      ? filtered
          .filter(tx => tx.type === 'expense')
          .reduce((sum, tx) => sum + tx.amount, 0) / uniqueDates.size
      : 0;
    
    // Most expensive category
    const categoryTotals: { [key: string]: number } = {};
    filtered
      .filter(tx => tx.type === 'expense')
      .forEach(tx => {
        if (!categoryTotals[tx.category]) {
          categoryTotals[tx.category] = 0;
        }
        categoryTotals[tx.category] += tx.amount;
      });
    
    let mostExpensiveCategory = { name: 'None', amount: 0 };
    Object.entries(categoryTotals).forEach(([categoryId, amount]) => {
      if (amount > mostExpensiveCategory.amount) {
        const category = defaultCategories.find(c => c.id === categoryId);
        mostExpensiveCategory = {
          name: category ? category.name : categoryId,
          amount
        };
      }
    });
    
    return {
      totalIncome,
      totalExpense,
      balance,
      averageDailySpending,
      mostExpensiveCategory
    };
  };
  
  const stats = calculateStatistics();
  const spendingByCategory = getSpendingByCategory();
  const spendingOverTime = getSpendingOverTime();
  const spendingByPaymentMethod = getSpendingByPaymentMethod();

  return (
    <div className="space-y-6">
      {/* Time Range Selector */}
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold">Financial Reports</h2>
        <div className="space-x-2">
          <Tabs value={timeRange} onValueChange={(value) => setTimeRange(value as any)}>
            <TabsList>
              <TabsTrigger value="7days">7 Days</TabsTrigger>
              <TabsTrigger value="30days">30 Days</TabsTrigger>
              <TabsTrigger value="90days">3 Months</TabsTrigger>
              <TabsTrigger value="year">Year</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </div>

      {/* Key Statistics */}
      <div className="grid gap-4 grid-cols-2 md:grid-cols-4">
        <Card>
          <CardContent className="p-4">
            <div className="text-sm font-medium text-gray-500">Income</div>
            <div className="text-2xl font-bold text-green-600">
              {formatCurrency(stats.totalIncome)}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-sm font-medium text-gray-500">Expenses</div>
            <div className="text-2xl font-bold text-red-600">
              {formatCurrency(stats.totalExpense)}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-sm font-medium text-gray-500">Balance</div>
            <div className={`text-2xl font-bold ${stats.balance >= 0 ? 'text-blue-600' : 'text-red-600'}`}>
              {formatCurrency(stats.balance)}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-sm font-medium text-gray-500">Daily Average</div>
            <div className="text-2xl font-bold text-purple-600">
              {formatCurrency(stats.averageDailySpending)}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Report Type Tabs */}
      <Tabs defaultValue={reportType} onValueChange={(value) => setReportType(value as any)}>
        <TabsList className="mb-4">
          <TabsTrigger value="spending">Spending Analysis</TabsTrigger>
          <TabsTrigger value="income">Income</TabsTrigger>
          <TabsTrigger value="cashflow">Cash Flow</TabsTrigger>
        </TabsList>
        
        <TabsContent value="spending" className="space-y-6">
          {/* Spending by Category */}
          <Card>
            <CardHeader>
              <CardTitle>Spending by Category</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                {spendingByCategory.length > 0 ? (
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={spendingByCategory}
                        dataKey="value"
                        nameKey="name"
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      >
                        {spendingByCategory.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color || CHART_COLORS[index % CHART_COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip 
                        formatter={(value: number) => formatCurrency(value)} 
                        contentStyle={{ backgroundColor: 'white', borderRadius: '4px', border: '1px solid #e2e8f0' }}
                      />
                      <Legend layout="vertical" verticalAlign="middle" align="right" />
                    </PieChart>
                  </ResponsiveContainer>
                ) : (
                  <div className="flex items-center justify-center h-full text-gray-400">
                    No spending data available for this time period
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
          
          {/* Spending by Payment Method */}
          <Card>
            <CardHeader>
              <CardTitle>Spending by Payment Method</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                {spendingByPaymentMethod.length > 0 ? (
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={spendingByPaymentMethod}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis tickFormatter={(value) => formatCurrency(value)} />
                      <Tooltip formatter={(value: number) => formatCurrency(value)} />
                      <Legend />
                      <Bar dataKey="amount" fill="#805AD5" name="Amount" />
                    </BarChart>
                  </ResponsiveContainer>
                ) : (
                  <div className="flex items-center justify-center h-full text-gray-400">
                    No payment data available for this time period
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="income" className="space-y-6">
          {/* Income Over Time */}
          <Card>
            <CardHeader>
              <CardTitle>Income Over Time</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                {spendingOverTime.length > 0 ? (
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={spendingOverTime}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" />
                      <YAxis tickFormatter={(value) => formatCurrency(value)} />
                      <Tooltip formatter={(value: number) => formatCurrency(value)} />
                      <Legend />
                      <Line type="monotone" dataKey="income" stroke="#38A169" name="Income" />
                    </LineChart>
                  </ResponsiveContainer>
                ) : (
                  <div className="flex items-center justify-center h-full text-gray-400">
                    No income data available for this time period
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="cashflow" className="space-y-6">
          {/* Cash Flow (Income vs Expenses) */}
          <Card>
            <CardHeader>
              <CardTitle>Cash Flow</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                {spendingOverTime.length > 0 ? (
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={spendingOverTime}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" />
                      <YAxis tickFormatter={(value) => formatCurrency(value)} />
                      <Tooltip formatter={(value: number) => formatCurrency(value)} />
                      <Legend />
                      <Line type="monotone" dataKey="income" stroke="#38A169" name="Income" />
                      <Line type="monotone" dataKey="expense" stroke="#E53E3E" name="Expenses" />
                    </LineChart>
                  </ResponsiveContainer>
                ) : (
                  <div className="flex items-center justify-center h-full text-gray-400">
                    No cash flow data available for this time period
                  </div>
                )}
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
                {spendingOverTime.length > 0 ? (
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={spendingOverTime.map(item => ({
                      date: item.date,
                      cashflow: item.income - item.expense
                    }))}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" />
                      <YAxis tickFormatter={(value) => formatCurrency(value)} />
                      <Tooltip formatter={(value: number) => formatCurrency(value)} />
                      <Legend />
                      <Bar 
                        dataKey="cashflow" 
                        fill="#3182CE" 
                        name="Net Cash Flow"
                        // Color bars based on positive/negative values
                        stroke="#0"
                      >
                        {spendingOverTime.map((entry, index) => (
                          <Cell 
                            key={`cell-${index}`} 
                            fill={(entry.income - entry.expense) >= 0 ? '#38A169' : '#E53E3E'} 
                          />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                ) : (
                  <div className="flex items-center justify-center h-full text-gray-400">
                    No cash flow data available for this time period
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ReportsPage;
