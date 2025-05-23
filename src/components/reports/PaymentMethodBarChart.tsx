
import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { formatCurrency } from '@/utils/formatters';

interface PaymentMethodData {
  name: string;
  amount: number;
}

interface PaymentMethodBarChartProps {
  data: PaymentMethodData[];
  currencyCode?: string;
}

const PaymentMethodBarChart: React.FC<PaymentMethodBarChartProps> = ({ 
  data,
  currencyCode = 'USD'
}) => {
  if (data.length === 0) {
    return (
      <div className="flex items-center justify-center h-full text-gray-400">
        No payment data available
      </div>
    );
  }

  return (
    <div className="h-[240px] mt-2">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis tickFormatter={(value) => formatCurrency(value, currencyCode)} />
          <Tooltip formatter={(value: number) => formatCurrency(value, currencyCode)} />
          <Bar dataKey="amount" fill="#805AD5" name="Amount" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PaymentMethodBarChart;
