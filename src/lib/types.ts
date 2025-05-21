
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
  location?: string;
  habitLink?: string;
  walletId?: string;  // New: Link to a specific wallet
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

export interface Habit {
  id: string;
  name: string;
  description?: string;
  savingsAmount: number;
  targetCategory: string;
  frequency?: 'daily' | 'weekly' | 'monthly';
  linkedAction?: string;
  createdAt: Date;
  active: boolean;
}

// New interface for wallet accounts
export interface Wallet {
  id: string;
  name: string;
  balance: number;
  currency: string;
  color: string;
  icon?: string;
  isDefault?: boolean;
  createdAt: Date;
}

// New interface for mini-apps
export interface MiniApp {
  id: string;
  name: string;
  description: string;
  icon: string;
  component: string; // Name of the component to render
  active: boolean;
}
