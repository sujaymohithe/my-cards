import { describe, expect, it, vi } from "vitest";
import { TransactionList } from "@/components/transactions";
import { render, screen } from "@testing-library/react";
import type { CardType, Transaction } from "@/domain/types";
import { mockTransactions } from "@/__tests__/fixtures/transactions";

type TransactionItemProps = { tx: Transaction; cardType: CardType };

vi.mock("@/components/transactions/TransactionItem", () => ({
  TransactionItem: ({ tx, cardType }: TransactionItemProps) => (
    <div data-testid={`transaction-${tx.id}`}>
      <div>{tx.description}</div>
      <div>{cardType}</div>
    </div>
  ),
}));

describe("TransactionList", () => {
  it("shows loading state", () => {
    render(<TransactionList transactions={[]} cardType="private" loading />);

    expect(screen.getByText("Loading transactions…")).toBeInTheDocument();
    expect(screen.queryByText("Transactions")).not.toBeInTheDocument();
    expect(screen.queryAllByTestId(/^transaction-/)).toHaveLength(0);
  });

  it("renders empty state when there are no transactions", () => {
    render(
      <TransactionList transactions={[]} cardType="private" loading={false} />,
    );

    expect(screen.getByText("Transactions")).toBeInTheDocument(); // Header
    expect(screen.getByText("No transactions found")).toBeInTheDocument();
    expect(screen.queryAllByTestId(/^transaction-/)).toHaveLength(0);
  });

  it("renders a list of transactions", () => {
    render(
      <TransactionList
        transactions={mockTransactions}
        cardType="private"
        loading={false}
      />,
    );
    expect(screen.getByText("Transactions")).toBeInTheDocument();
    expect(screen.getAllByTestId(/^transaction-/)).toHaveLength(
      mockTransactions.length,
    );
  });
});
