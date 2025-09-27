/**
 * Format price with currency symbol
 * @param price - The price to format
 * @param currency - The currency code (USD, BDT, etc.)
 * @returns Formatted price string with currency symbol
 */
export function formatPrice(price: number, currency: string = 'USD'): string {
  // Define currency symbols
  const currencySymbols: Record<string, string> = {
    'USD': '$',
    'EUR': '€',
    'GBP': '£',
    'CAD': 'CA$',
    'BDT': '৳',
  };

  // Get the currency symbol
  const symbol = currencySymbols[currency] || currencySymbols['USD'];

  // For BDT, we typically format as "৳1,234" (symbol before the number)
  if (currency === 'BDT') {
    return `${symbol}${price.toLocaleString('en-BD', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    })}`;
  }

  // For other currencies, use standard formatting
  return `${symbol}${price.toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  })}`;
}

/**
 * Get currency symbol by currency code
 * @param currency - The currency code
 * @returns The currency symbol
 */
export function getCurrencySymbol(currency: string): string {
  const currencySymbols: Record<string, string> = {
    'USD': '$',
    'EUR': '€',
    'GBP': '£',
    'CAD': 'CA$',
    'BDT': '৳',
  };

  return currencySymbols[currency] || '$';
}