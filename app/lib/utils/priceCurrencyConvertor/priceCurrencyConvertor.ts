/**
 * Converts a price from one currency to another using a conversion rate.
 *
 * This function multiplies the given price by a conversion rate to convert
 * between currencies. It includes special handling for edge cases:
 * - Returns the original price if conversion rate is 0 or 1 (no conversion needed)
 * - Rounds up the final converted amount using Math.ceil for consistent pricing
 * - Ensures precision by fixing to 2 decimal places before rounding
 *
 * @param givenPrice - The original price amount to convert
 * @param conversionPrice - The conversion rate/multiplier (defaults to 0)
 * @returns The converted price rounded up to the nearest whole number, or original price if no conversion needed
 *
 * @example
 * ```typescript
 * // Convert USD to INR (assuming 1 USD = 83.12 INR)
 * priceCurrencyConvertor(100, 83.12); // returns 8312
 *
 * // Convert EUR to USD (assuming 1 EUR = 1.08 USD)
 * priceCurrencyConvertor(50, 1.08); // returns 54
 *
 * // No conversion needed (rate = 1)
 * priceCurrencyConvertor(100, 1); // returns 100
 *
 * // No conversion needed (rate = 0, default)
 * priceCurrencyConvertor(100); // returns 100
 * priceCurrencyConvertor(100, 0); // returns 100
 *
 * // Decimal conversion with rounding up
 * priceCurrencyConvertor(29.99, 1.5); // returns 45 (44.985 rounded up)
 * ```
 */

export const priceCurrencyConvertor = (
  givenPrice: number,
  conversionPrice: number = 0,
) => {
  if (conversionPrice === 0 || conversionPrice === 1) return givenPrice;

  return Number((givenPrice * conversionPrice).toFixed(2));
};
