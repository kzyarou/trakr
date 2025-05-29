
import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
} from 'recharts';
import { formatCurrency } from '@/utils/formatters';

interface CashFlowData {
  date: string;
  income: number;
  expense: number;
}

interface NetCashFlowBarChartProps {
  data: CashFlowData[];
  currencyCode?: string;
}

const NetCashFlowBarChart: React.FC<NetCashFlowBarChartProps> = ({ 
  data,
  currencyCode = 'USD'
}) => {
  if (data.length === 0) {
    return (
      <div className="flex items-center justify-center h-full text-gray-400">
        No cash flow data available
      </div>
    );
  }

  const transformedData = data.map(item => ({
    date: item.date,
    cashflow: item.income - item.expense
  }));

  return (
    <div className="h-[300px]">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={transformedData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis tickFormatter={(value) => formatCurrency(value, currencyCode)} />
          <Tooltip formatter={(value: number) => formatCurrency(value, currencyCode)} />
          <Legend />
          <Bar 
            dataKey="cashflow" 
            fill="#3182CE" 
            name="Net Cash Flow"
            stroke="#0"
          >
            {transformedData.map((entry, index) => (
              <Cell 
                key={`cell-${index}`} 
                fill={entry.cashflow >= 0 ? '#38A169' : '#E53E3E'} 
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default NetCashFlowBarChart;
