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
