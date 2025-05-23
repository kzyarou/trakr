
import React from 'react';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface TimeRangeSelectorProps {
  timeRange: 'seven_days' | '30days' | '90days' | 'year';
  setTimeRange: (value: 'seven_days' | '30days' | '90days' | 'year') => void;
}

const TimeRangeSelector: React.FC<TimeRangeSelectorProps> = ({ 
  timeRange, 
  setTimeRange 
}) => {
  return (
    <div className="flex justify-between items-center flex-col sm:flex-row gap-2">
      <h2 className="text-lg font-semibold">Financial Reports</h2>
      <div>
        <Tabs value={timeRange} onValueChange={(value) => setTimeRange(value as any)}>
          <TabsList className="w-full overflow-x-auto no-scrollbar">
            <TabsTrigger value="seven_days">7 Days</TabsTrigger>
            <TabsTrigger value="30days">30 Days</TabsTrigger>
            <TabsTrigger value="90days">3 Months</TabsTrigger>
            <TabsTrigger value="year">Year</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
    </div>
  );
};

export default TimeRangeSelector;
