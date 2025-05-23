
import { Transaction } from '@/lib/types';
import { format, subDays, differenceInDays } from 'date-fns';
import { defaultCategories } from '@/lib/data';

// Filter transactions by time range
export const getFilteredTransactions = (
  transactions: Transaction[], 
  timeRange: 'seven_days' | '30days' | '90days' | 'year'
): Transaction[] => {
  const today = new Date();
  let startDate: Date;
  
  switch (timeRange) {
    case 'seven_days':
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

// Get spending by category for pie chart
export const getSpendingByCategory = (transactions: Transaction[]) => {
  const filtered = transactions.filter(tx => tx.type === 'expense');
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
export const getSpendingOverTime = (transactions: Transaction[]) => {
  if (transactions.length === 0) return [];
  
  const days = differenceInDays(
    new Date(), 
    new Date(Math.min(...transactions.map(tx => new Date(tx.date).getTime())))
  );
  
  // Group data by days, weeks, or months depending on time range
  let groupBy: 'day' | 'week' | 'month' = 'day';
  if (days > 60) {
    groupBy = 'month';
  } else if (days > 14) {
    groupBy = 'week';
  }
  
  const data: { [key: string]: { date: string, expense: number, income: number } } = {};
  
  transactions.forEach(tx => {
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
export const getSpendingByPaymentMethod = (transactions: Transaction[]) => {
  const filtered = transactions.filter(tx => tx.type === 'expense');
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

// Calculate statistics
export const calculateStatistics = (transactions: Transaction[]) => {
  const totalIncome = transactions
    .filter(tx => tx.type === 'income')
    .reduce((sum, tx) => sum + tx.amount, 0);
    
  const totalExpense = transactions
    .filter(tx => tx.type === 'expense')
    .reduce((sum, tx) => sum + tx.amount, 0);
    
  const balance = totalIncome - totalExpense;
  
  // Average daily spending
  const uniqueDates = new Set(transactions
    .filter(tx => tx.type === 'expense')
    .map(tx => format(new Date(tx.date), 'yyyy-MM-dd')));
  
  const averageDailySpending = uniqueDates.size > 0 
    ? transactions
        .filter(tx => tx.type === 'expense')
        .reduce((sum, tx) => sum + tx.amount, 0) / uniqueDates.size
    : 0;
  
  // Most expensive category
  const categoryTotals: { [key: string]: number } = {};
  transactions
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
