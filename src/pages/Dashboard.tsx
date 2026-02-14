import { ErrorBanner, Section } from "@/components/ui";
import { useCards, useTransactions } from "@/hooks";
import { useState } from "react";

/**
 * The main dashboard page which displays a list of cards,
 * an amount filter, and a list of transactions for the
 * selected card.
 *
 * If there is an error loading the cards or transactions,
 * an error banner is displayed with the error message.
 *
 * If there is no error, the dashboard is displayed with three
 * sections: a card list, an amount filter, and a
 * transaction list.
 */
export function Dashboard() {
  const { cards, loading: loadingCards, error: cardsError } = useCards();
  const [userSelectedCardId, setUserSelectedCardId] = useState<string | null>(
    null,
  );

  const selectedCard =
    cards.find((card) => card.id === userSelectedCardId) ?? cards[0] ?? null;
  const selectedCardId = selectedCard?.id ?? "";

  const {
    trasactions,
    loading: loadingTransactions,
    error: transactionsError,
  } = useTransactions(selectedCardId);

  const error = cardsError ?? transactionsError;

  if (error) {
    return (
      <div className="container py-12">
        <ErrorBanner {...error} />
      </div>
    );
  }

  return (
    <div className="flex flex-1 flex-col space-y-8 overflow-hidden">
      <Section className="shrink-0">CardList</Section>

      <Section className="shrink-0">Amount FIlter</Section>

      <Section className="flex flex-1 flex-col overflow-hidden">
        <div className="flex-1 overflow-y-auto scroll-smooth ">
          TransactionList
        </div>
      </Section>
    </div>
  );
}
