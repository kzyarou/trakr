
import React from 'react';
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useMediaQuery } from '@/hooks/use-mobile';
import { formatCurrency } from '@/utils/formatters';
import { defaultCategories } from '@/lib/data';

interface SpendingCategoryData {
  name: string;
  value: number;
  color: string;
}

interface SpendingCategoryPieChartProps {
  data: SpendingCategoryData[];
  currencyCode?: string;
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
  currencyCode?: string;
}

const CustomTooltip = ({ active, payload, currencyCode = 'USD' }: CustomTooltipProps) => {
  if (active && payload && payload.length) {
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

const SpendingCategoryPieChart: React.FC<SpendingCategoryPieChartProps> = ({ data, currencyCode = 'USD' }) => {
  const isMobile = useMediaQuery("(max-width: 768px)");

  // If no data, show placeholder
  if (data.length === 0) {
    return (
      <div className="flex items-center justify-center h-full text-gray-400">
        No spending data available
      </div>
    );
  }

  // For mobile, limit and simplify data if there are too many categories
  const displayData = isMobile && data.length > 5 
    ? [...data.slice(0, 4), {
        name: 'Others',
        value: data.slice(4).reduce((sum, item) => sum + item.value, 0),
        color: '#718096'
      }]
    : data;

  // Mobile optimized pie chart labels
  const renderPieChartLabel = ({ name, percent }: any) => {
    if (isMobile) {
      // For mobile, show shorter labels
      const shortName = name.length > 10 ? `${name.substring(0, 8)}...` : name;
      return `${shortName}: ${(percent * 100).toFixed(0)}%`;
    }
    return `${name}: ${(percent * 100).toFixed(0)}%`;
  };

  return (
    <div className="h-[240px] mt-2">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={displayData}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={isMobile ? 70 : 80}
            label={renderPieChartLabel}
            labelLine={!isMobile}
          >
            {displayData.map((entry, index) => (
              <Cell 
                key={`cell-${index}`} 
                fill={entry.color || CHART_COLORS[index % CHART_COLORS.length]} 
              />
            ))}
          </Pie>
          <Tooltip 
            content={<CustomTooltip currencyCode={currencyCode} />} 
            formatter={(value: number) => formatCurrency(value, currencyCode)} 
            contentStyle={{ backgroundColor: 'white', borderRadius: '4px', border: '1px solid #e2e8f0' }}
          />
          <Legend 
            layout={isMobile ? "horizontal" : "vertical"} 
            verticalAlign={isMobile ? "bottom" : "middle"} 
            align={isMobile ? "center" : "right"}
            wrapperStyle={isMobile ? { fontSize: '10px' } : {}}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SpendingCategoryPieChart;
