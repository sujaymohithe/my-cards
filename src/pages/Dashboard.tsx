import { CardCarousel } from "@/components/cards";
import { TransactionList } from "@/components/transactions";
import { ErrorBanner, Section } from "@/components/ui";
import type { CardType } from "@/domain/types";
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
  const selectedCardType: CardType = selectedCard?.type ?? "other";
  const selectedCardId = selectedCard?.id ?? "";

  const onSelectCard = (id: string) => {
    setUserSelectedCardId(id);
  };

  const {
    transactions,
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

  if (!error && !loadingCards && !cards.length) {
    return (
      <div className="container py-12">
        <div className="text-foreground/70 mx-auto w-full text-center">
          No cards found
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-1 flex-col space-y-8 overflow-hidden">
      <Section className="shrink-0">
        <CardCarousel
          cards={cards}
          onSelect={onSelectCard}
          selectedCardId={selectedCardId}
          loading={loadingCards}
        ></CardCarousel>
      </Section>

      <Section className="shrink-0">Amount Filter</Section>

      <Section className="flex flex-1 flex-col overflow-hidden">
        <TransactionList
          transactions={transactions}
          loading={loadingTransactions}
          cardType={selectedCardType}
        />
      </Section>
    </div>
  );
}
