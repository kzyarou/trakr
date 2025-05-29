
/**
 * Format a number as currency
 * @param amount - The amount to format
 * @param currencyCode - ISO 4217 currency code (default: 'USD')
 * @returns Formatted currency string
 */
export const formatCurrency = (amount: number, currencyCode: string = 'USD'): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currencyCode,
    maximumFractionDigits: 0
  }).format(amount);
};
