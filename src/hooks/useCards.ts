import { useEffect, useState } from "react";
import { apiClient } from "@/api/ApiClient";
import type { Card } from "@/domain/types";
import { mapErrorToMessage, type AppError } from "@/utils";

/**
 * Hook to load cards from the API.
 *
 * @returns An object with three properties:
 * - `cards`: An array of `Card` objects.
 * - `loading`: A boolean indicating whether the data is being loaded.
 * - `error`: A string or null indicating any error that occurred while loading the data.
 */
export function useCards() {
  const [cards, setCards] = useState<Card[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<AppError | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      setLoading(true);
      setError(null);
      try {
        const data = await apiClient.getCards();
        if (!cancelled) {
          setCards(data);
        }
      } catch (e) {
        if (!cancelled) {
          setError(mapErrorToMessage(e, "Failed to load cards"));
          setCards([]);
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
  }, []);
  return { cards, loading, error };
}
