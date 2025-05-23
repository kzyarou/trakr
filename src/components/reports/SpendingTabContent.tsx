
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { useMediaQuery } from '@/hooks/use-mobile';
import SpendingCategoryPieChart from './SpendingCategoryPieChart';
import PaymentMethodBarChart from './PaymentMethodBarChart';

interface SpendingTabContentProps {
  spendingByCategory: Array<{
    name: string;
    value: number;
    color: string;
  }>;
  spendingByPaymentMethod: Array<{
    name: string;
    amount: number;
  }>;
  currencyCode?: string;
}

const SpendingTabContent: React.FC<SpendingTabContentProps> = ({ 
  spendingByCategory, 
  spendingByPaymentMethod,
  currencyCode = 'USD'
}) => {
  const isMobile = useMediaQuery("(max-width: 768px)");
  
  // For mobile view, use accordion for better space management
  if (isMobile) {
    return (
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="spending-by-category">
          <AccordionTrigger className="text-base font-medium">
            Spending by Category
          </AccordionTrigger>
          <AccordionContent>
            <SpendingCategoryPieChart data={spendingByCategory} currencyCode={currencyCode} />
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="spending-by-payment">
          <AccordionTrigger className="text-base font-medium">
            Spending by Payment Method
          </AccordionTrigger>
          <AccordionContent>
            <PaymentMethodBarChart data={spendingByPaymentMethod} currencyCode={currencyCode} />
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    );
  }
  
  // Desktop view: Use regular cards
  return (
    <>
      {/* Spending by Category */}
      <Card>
        <CardHeader>
          <CardTitle>Spending by Category</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <SpendingCategoryPieChart data={spendingByCategory} currencyCode={currencyCode} />
          </div>
        </CardContent>
      </Card>
      
      {/* Spending by Payment Method */}
      <Card>
        <CardHeader>
          <CardTitle>Spending by Payment Method</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <PaymentMethodBarChart data={spendingByPaymentMethod} currencyCode={currencyCode} />
          </div>
        </CardContent>
      </Card>
    </>
  );
};

export default SpendingTabContent;
