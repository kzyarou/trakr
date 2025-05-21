
import React, { useState, useEffect } from 'react';
import { useToast } from "@/hooks/use-toast";
import Navbar from '@/components/Navbar';
import TransactionForm from '@/components/TransactionForm';
import TransactionList from '@/components/TransactionList';
import SummaryCards from '@/components/SummaryCards';
import CategoryPieChart from '@/components/CategoryPieChart';
import BudgetOverview from '@/components/BudgetOverview';
import { 
  getTransactions, 
  saveTransactions, 
  getBudgets, 
  calculateSummary
} from '@/lib/data';
import { Transaction } from '@/lib/types';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const Index = () => {
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [showTransactionForm, setShowTransactionForm] = useState(false);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [budgets, setBudgets] = useState(getBudgets());
  const { toast } = useToast();

  // Load transactions from local storage
  useEffect(() => {
    setTransactions(getTransactions());
  }, []);

  // Calculate summary statistics
  const summary = calculateSummary(transactions);

  // Handle adding a new transaction
  const handleAddTransaction = (transaction: Transaction) => {
    const newTransactions = [...transactions, transaction];
    setTransactions(newTransactions);
    saveTransactions(newTransactions);
    
    toast({
      title: "Transaction added",
      description: `${transaction.type === 'income' ? 'Income' : 'Expense'} of $${transaction.amount} has been added.`,
    });
  };

  // Handle deleting a transaction
  const handleDeleteTransaction = (id: string) => {
    const newTransactions = transactions.filter(tx => tx.id !== id);
    setTransactions(newTransactions);
    saveTransactions(newTransactions);
    
    toast({
      title: "Transaction deleted",
      description: "The transaction has been removed.",
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar 
        onNavigate={setCurrentPage} 
        currentPage={currentPage} 
        onAddTransaction={() => setShowTransactionForm(true)}
      />
      
      <main className="container py-6 px-4 max-w-7xl">
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">
              {currentPage === 'dashboard' && 'Dashboard'}
              {currentPage === 'transactions' && 'Transactions'}
              {currentPage === 'budgets' && 'Budgets'}
              {currentPage === 'reports' && 'Reports'}
              {currentPage === 'settings' && 'Settings'}
            </h1>
            <p className="text-muted-foreground">
              {currentPage === 'dashboard' && 'Overview of your financial status'}
              {currentPage === 'transactions' && 'Manage your income and expenses'}
              {currentPage === 'budgets' && 'Track your spending against budgets'}
              {currentPage === 'reports' && 'Analyze your financial patterns'}
              {currentPage === 'settings' && 'Customize your experience'}
            </p>
          </div>

          {currentPage === 'dashboard' && (
            <div className="space-y-6 animate-fade-in">
              {/* Summary Cards */}
              <SummaryCards summary={summary} />
              
              <div className="grid gap-6 md:grid-cols-2">
                {/* Category Distribution */}
                <CategoryPieChart summary={summary} />
                
                {/* Budget Overview */}
                <BudgetOverview 
                  budgets={budgets}
                  transactions={transactions}
                />
              </div>
              
              {/* Recent Transactions */}
              <div className="space-y-4">
                <h2 className="text-lg font-semibold tracking-tight">Recent Transactions</h2>
                <TransactionList 
                  transactions={transactions.slice(0, 5)}
                  onDeleteTransaction={handleDeleteTransaction}
                />
              </div>
            </div>
          )}

          {currentPage === 'transactions' && (
            <div className="animate-fade-in">
              <Tabs defaultValue="all" className="w-full">
                <TabsList className="mb-4">
                  <TabsTrigger value="all">All</TabsTrigger>
                  <TabsTrigger value="income">Income</TabsTrigger>
                  <TabsTrigger value="expense">Expenses</TabsTrigger>
                </TabsList>
                
                <TabsContent value="all" className="space-y-4">
                  <TransactionList 
                    transactions={transactions}
                    onDeleteTransaction={handleDeleteTransaction}
                  />
                </TabsContent>
                
                <TabsContent value="income" className="space-y-4">
                  <TransactionList 
                    transactions={transactions.filter(tx => tx.type === 'income')}
                    onDeleteTransaction={handleDeleteTransaction}
                  />
                </TabsContent>
                
                <TabsContent value="expense" className="space-y-4">
                  <TransactionList 
                    transactions={transactions.filter(tx => tx.type === 'expense')}
                    onDeleteTransaction={handleDeleteTransaction}
                  />
                </TabsContent>
              </Tabs>
            </div>
          )}

          {currentPage === 'budgets' && (
            <div className="animate-fade-in text-center py-20">
              <h2 className="text-xl font-semibold">Budget Management</h2>
              <p className="text-gray-500 mt-2">Budget features coming soon!</p>
            </div>
          )}

          {currentPage === 'reports' && (
            <div className="animate-fade-in text-center py-20">
              <h2 className="text-xl font-semibold">Financial Reports</h2>
              <p className="text-gray-500 mt-2">Detailed reports coming soon!</p>
            </div>
          )}

          {currentPage === 'settings' && (
            <div className="animate-fade-in text-center py-20">
              <h2 className="text-xl font-semibold">Settings & Preferences</h2>
              <p className="text-gray-500 mt-2">Customization options coming soon!</p>
            </div>
          )}
        </div>
      </main>

      <TransactionForm 
        open={showTransactionForm}
        onOpenChange={setShowTransactionForm}
        onAddTransaction={handleAddTransaction}
      />
    </div>
  );
};

export default Index;
