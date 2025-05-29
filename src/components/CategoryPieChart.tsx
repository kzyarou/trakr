
import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { SummaryStats } from '@/lib/types';
import { defaultCategories } from '@/lib/data';
import { useMediaQuery } from '@/hooks/use-mobile';
import { formatCurrency } from '@/utils/formatters';

interface CategoryPieChartProps {
  summary: SummaryStats;
}

interface CustomTooltipProps {
  active?: boolean;
  payload?: Array<{
    name: string;
    value: number;
    payload: {
      name: string;
      value: number;
      color: string;
    };
  }>;
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
  '#4299E1', // light blue
  '#9F7AEA', // light purple
];

// Custom tooltip component
const CustomTooltip = ({ active, payload }: CustomTooltipProps) => {
  if (active && payload && payload.length) {
    const currencyCode = localStorage.getItem('currency') || 'USD';
    return (
      <div className="bg-white dark:bg-gray-800 p-2 shadow rounded border text-sm">
        <p className="font-medium">{payload[0].name}</p>
        <p className="text-gray-700 dark:text-gray-300">
          {formatCurrency(payload[0].value, currencyCode)}
        </p>
      </div>
    );
  }

  return null;
};

const CategoryPieChart: React.FC<CategoryPieChartProps> = ({ summary }) => {
  const isMobile = useMediaQuery("(max-width: 768px)");
  const currencyCode = localStorage.getItem('currency') || 'USD';
  
  // Prepare data for the pie chart
  const pieData = Object.entries(summary.categoryTotals).map(([categoryId, amount]) => {
    const category = defaultCategories.find(c => c.id === categoryId);
    return {
      name: category ? category.name : categoryId,
      value: amount,
      color: category ? category.color : '#CBD5E0',
    };
  }).filter(item => item.value > 0);

  // If no data, show placeholder
  if (pieData.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Expense Breakdown</CardTitle>
        </CardHeader>
        <CardContent className="flex items-center justify-center h-[300px]">
          <p className="text-muted-foreground">No expense data available</p>
        </CardContent>
      </Card>
    );
  }

  // For mobile, limit and simplify data if there are too many categories
  const displayData = isMobile && pieData.length > 5 
    ? [...pieData.slice(0, 4), {
        name: 'Others',
        value: pieData.slice(4).reduce((sum, item) => sum + item.value, 0),
        color: '#718096'
      }]
    : pieData;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Expense Breakdown</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={displayData}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={isMobile ? 70 : 80}
                fill="#8884d8"
                dataKey="value"
                label={({ name, percent }) => 
                  isMobile ? '' : `${name}: ${(percent * 100).toFixed(0)}%`}
              >
                {displayData.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={entry.color || CHART_COLORS[index % CHART_COLORS.length]} 
                  />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
              <Legend 
                layout={isMobile ? "horizontal" : "vertical"} 
                verticalAlign={isMobile ? "bottom" : "middle"} 
                align={isMobile ? "center" : "right"}
                wrapperStyle={isMobile ? { fontSize: '10px' } : {}}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default CategoryPieChart;
