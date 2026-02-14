import { useEffect, useState } from "react";
import type { Transaction } from "@/domain/types";
import { apiClient } from "@/api/ApiClient";
import { mapErrorToMessage, type AppError } from "@/utils";

/**
 * Hook to load transactions from the API.
 *
 * @param {string} cardId - the ID of the card to load transactions for
 * @returns An object with three properties:
 * - `transactions`: An array of `Transaction` objects.
 * - `loading`: A boolean indicating whether the data is being loaded.
 * - `error`: A string or null indicating any error that occurred while loading the data.
 */
export function useTransactions(cardId: string) {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<AppError | null>(null);

  useEffect(() => {
    if (!cardId) {
      setTransactions([]);
      setLoading(false);
      setError(null);
      return;
    }

    let cancelled = false;

    async function load() {
      setLoading(true);
      setError(null);
      try {
        const data = await apiClient.getTransactions(cardId);
        if (!cancelled) {
          setTransactions(data);
        }
      } catch (e) {
        if (!cancelled) {
          setError(mapErrorToMessage(e, "Failed to load transactions"));
          setTransactions([]);
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    load();

    return () => {
      cancelled = true;
    };
  }, [cardId]);

  return { transactions, loading, error };
}
