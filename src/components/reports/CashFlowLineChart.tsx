
import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { formatCurrency } from '@/utils/formatters';

interface CashFlowData {
  date: string;
  income: number;
  expense: number;
}

interface CashFlowLineChartProps {
  data: CashFlowData[];
  showIncome?: boolean;
  showExpense?: boolean;
  currencyCode?: string;
  height?: number;
}

const CashFlowLineChart: React.FC<CashFlowLineChartProps> = ({ 
  data, 
  showIncome = true, 
  showExpense = true,
  currencyCode = 'USD',
  height = 300
}) => {
  if (data.length === 0) {
    return (
      <div className="flex items-center justify-center h-full text-gray-400">
        No cash flow data available
      </div>
    );
  }

  return (
    <div className={`h-[${height}px]`}>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis tickFormatter={(value) => formatCurrency(value, currencyCode)} />
          <Tooltip formatter={(value: number) => formatCurrency(value, currencyCode)} />
          <Legend />
          {showIncome && (
            <Line type="monotone" dataKey="income" stroke="#38A169" name="Income" />
          )}
          {showExpense && (
            <Line type="monotone" dataKey="expense" stroke="#E53E3E" name="Expenses" />
          )}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CashFlowLineChart;
