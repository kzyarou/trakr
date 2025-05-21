
export type TransactionType = 'income' | 'expense';

export interface Transaction {
  id: string;
  amount: number;
  date: Date;
  category: string;
  description?: string;
  type: TransactionType;
  paymentMethod: string;
  tags?: string[];
}

export interface Category {
  id: string;
  name: string;
  color: string;
  icon?: string;
  type: TransactionType | 'both';
}

export interface Budget {
  id: string;
  category: string;
  amount: number;
  period: 'weekly' | 'monthly' | 'yearly';
  startDate: Date;
  endDate?: Date;
}

export interface SummaryStats {
  totalIncome: number;
  totalExpense: number;
  balance: number;
  mostSpentCategory: {
    name: string;
    amount: number;
  };
  categoryTotals: {
    [key: string]: number;
  };
}
