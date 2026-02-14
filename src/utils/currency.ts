/**
 * Formats a given amount in euros using the German locale.
 *
 * @param {number} amount - The amount to format
 * @returns {string} The formatted amount as a string
 */
export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("de-DE", {
    style: "currency",
    currency: "EUR",
  }).format(amount);
}

/**
 * Formats a given amount in euros using the German locale with a fixed number of two decimal places. 
 * (123 -> 123,00) (1200 -> 1.200,00)
 * This is useful for displaying amounts in input fields on screen.
 *
 * @param {number} amount - The amount to format
 * @returns {string} The formatted amount as a string
 */
export function formatCurrencyInput(amount: number): string {
  return new Intl.NumberFormat("de-DE", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
}

/**
 * Parses German locale amount (1.234,56 → 1234.56)
 * Returns null if invalid
 *
 * @param {string} amount - The amount to parse
 * @returns {number|null} The parsed amount or null if the parsing failed
 */
export function parseGermanCurrency(amount: string): number | null {
  if (!amount) return null;

  const normalized = Number(amount.replace(/\./g, "").replace(",", "."));
  const parsed = Number(normalized);
  return isNaN(parsed) ? null : parsed;
}
