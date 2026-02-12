import type { Card, Transaction } from "../domain/types";
import { cardsSchema, transactionsByCardIdSchema } from "./schema";

export class ApiClient {
  /**
   * Fetches all cards from the API.
   * @returns A promise resolving to an array of Card objects.
   */
  async getCards(): Promise<Card[]> {
    const cards: unknown = (await import("./mock/cards.json")).default;
    const parsed = cardsSchema.parse(cards);
    return parsed;
  }

  /**
   * Fetches all transactions for a given card ID from the API.
   * If the card ID does not exist in the API, an empty list is returned.
   * @param {string} cardId - The ID of the card to fetch transactions for
   * @returns A promise resolving to an array of Transaction objects
   */
  async getTransactions(cardId: string): Promise<Transaction[]> {
    const transactions: unknown = (await import("./mock/transactions.json"))
      .default;
    const parsed = transactionsByCardIdSchema.parse(transactions);
    // return empty list for new card with no transactions
    return parsed[cardId] ?? [];
  }
}

export const apiClient = new ApiClient();
