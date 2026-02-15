import type { CardType, Transaction } from "@/domain/types";
import { TransactionItem } from "./TransactionItem";
import { cn } from "@/lib";
import { CARD_COLORS } from "@/theme";

interface TransactionListProps {
  transactions: Transaction[];
  loading: boolean;
  cardType: CardType;
}

/**
 * A component to render a list of transactions.
 *
 * @param {TransactionListProps} props - The props for the component
 * @param {Transaction[]} props.transactions - An array of `Transaction` objects
 * @param {boolean} props.loading - A boolean indicating whether the data is being loaded
 * @param {CardType} props.cardType - The type of the card to display the transactions for
 *
 * If `loading` is true, a loading message is displayed.
 * If there are no transactions, a message indicating this is displayed.
 * Otherwise, each transaction is rendered using a `TransactionItem` component.
 */
export function TransactionList({
  transactions,
  loading,
  cardType,
}: TransactionListProps) {
  const bgClass = CARD_COLORS[cardType];

  if (loading) {
    return (
      <div className="text-foreground/70 border-foreground/10 flex flex-1 items-center justify-center rounded-2xl border">
        Loading transactions…
      </div>
    );
  }

  return (
    <div className="border-foreground/10 flex-1 overflow-y-auto scroll-smooth rounded-2xl border p-4 sm:p-6">
      <h3 className="text-foreground mb-4 text-lg font-semibold">
        Transactions
      </h3>

      {!transactions.length ? (
        <div
          className={cn(
            "flex flex-1 items-center justify-center rounded-2xl border p-4 sm:p-6",
            bgClass,
          )}
        >
          No transactions found
        </div>
      ) : (
        <div className="space-y-3">
          {transactions.map((tx) => (
            <TransactionItem key={tx.id} tx={tx} cardType={cardType} />
          ))}
        </div>
      )}
    </div>
  );
}
