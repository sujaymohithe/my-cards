import type { CardType, Transaction } from "@/domain/types";
import { cn } from "@/lib";
import { formatCurrency } from "@/utils";

interface TransactionItemProps {
  tx: Transaction;
  cardType: CardType;
}

/**
 * A component to render a single transaction item.
 * It displays the transaction description, date, and amount.
 * The background color is determined by the card type.
 * The amount is formatted as currency and the sign is determined by the transaction type (credit/debit).
 * @param {TransactionItemProps} props - The props for the component
 * @returns A JSX element representing the transaction item
 */
export function TransactionItem({ tx, cardType }: TransactionItemProps) {
  const bgClass = `bg-card-${cardType}`; // Custom Tailwind utility

  const formattedAmount = formatCurrency(tx.amount);
  const isCredit = tx.type === "credit";

  return (
    <div
      className={cn(
        "border-foreground/10 flex items-center justify-between rounded-2xl border px-6 py-4",
        bgClass,
      )}
    >
      <div className="flex flex-col space-y-1 text-base font-medium">
        <span>{tx.description}</span>
        <span className="text-foreground/40 text-sm">
          {new Date(tx.date).toLocaleDateString("de-DE")}
        </span>
      </div>
      <div
        className={cn(
          "text-base font-semibold",
          isCredit ? "text-success" : "text-foreground",
        )}
      >
        <span>
          {isCredit ? "+" : "-"}
          {formattedAmount}
        </span>
      </div>
    </div>
  );
}
