import { CardCarousel } from "@/components/cards";
import { AmountFilter } from "@/components/filter";
import { TransactionList } from "@/components/transactions";
import { ErrorBanner, Section } from "@/components/ui";
import type { CardType } from "@/domain/types";
import { useCards, useTransactions } from "@/hooks";
import { formatCurrencyInput, parseGermanCurrency } from "@/utils";
import { useMemo, useState } from "react";

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

  const [amount, setAmount] = useState<number | null>(null);
  const [displayAmount, setDisplayAmount] = useState("");

  const selectedCard =
    cards.find((card) => card.id === userSelectedCardId) ?? cards[0] ?? null;
  const selectedCardType: CardType = selectedCard?.type ?? "other";
  const selectedCardId = selectedCard?.id ?? "";

  /**
   * Handles when a user selects a card from the card list.
   * Resets the selected amount and display amount to null and empty string respectively.
   * @param {string} id - The ID of the selected card
   */
  const onSelectCard = (id: string) => {
    setUserSelectedCardId(id);
    setAmount(null);
    setDisplayAmount("");
  };

  /**
   * Updates amount filter: raw -> parsed number (or null), keeps raw display on screen
   * @param {string} raw - The user input for the amount filter
   */
  const handleAmountChange = (raw: string) => {
    setAmount(parseGermanCurrency(raw));
    setDisplayAmount(raw);
  };

  /**
   * Formats the display amount filter using the formatCurrencyInput utility
   * and updates the display amount on screen.
   */
  const handleBlur = () => {
    if (!amount) {
      setDisplayAmount("");
    } else {
      setDisplayAmount(formatCurrencyInput(amount));
    }
  };

  const {
    transactions,
    loading: loadingTransactions,
    error: transactionsError,
  } = useTransactions(selectedCardId);

  const filteredTransactions = useMemo(() => {
    if (amount === null || Number.isNaN(amount)) return transactions;
    return transactions.filter((t) => t.amount >= amount);
  }, [transactions, amount]);

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

      <Section className="shrink-0">
        <AmountFilter
          displayValue={displayAmount}
          onChange={handleAmountChange}
          disabled={!amount && filteredTransactions.length === 0}
          onBlur={handleBlur}
        />
      </Section>

      <Section className="flex flex-1 flex-col overflow-hidden">
        <TransactionList
          transactions={filteredTransactions}
          loading={loadingTransactions}
          cardType={selectedCardType}
        />
      </Section>
    </div>
  );
}
