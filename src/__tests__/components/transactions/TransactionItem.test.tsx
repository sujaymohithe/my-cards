import { describe, expect, it, vi } from "vitest";
import { TransactionItem } from "@/components/transactions";
import { render, screen } from "@testing-library/react";
import { mockTransactions } from "../../fixtures/transactions";

vi.mock("@/theme", () => ({
  CARD_COLORS: {
    private: "bg-private",
    travel: "bg-travel",
    other: "bg-other",
  },
}));

vi.mock("@/utils", () => ({
  formatCurrency: (n: number) => `${n},00 €`,
}));

describe("TransactionItem", () => {
  it("applies correct background color from CARD_COLORS", () => {
    const tx = mockTransactions[0];
    render(
      <TransactionItem tx={tx} cardType="private" />,
    );

    expect(screen.getByTestId("transaction-t1")).toHaveClass("bg-private");
  });

  it("renders a debit transaction correctly", () => {
    const tx = mockTransactions[0];

    render(<TransactionItem tx={tx} cardType="private" />);

    const expectedAmount = `-${tx.amount},00 €`;
    const expectedDate = new Date(tx.date).toLocaleDateString("de-DE");

    expect(screen.getByText(tx.description)).toBeInTheDocument();
    expect(screen.getByText(expectedAmount)).toBeInTheDocument();
    expect(screen.getByText(expectedDate)).toBeInTheDocument();
  });

  it("renders a credit transaction correctly with correct styling", () => {
    const tx = mockTransactions[1];

    render(<TransactionItem tx={tx} cardType="private" />);

    const expectedAmount = `+${tx.amount},00 €`;
    const expectedDate = new Date(tx.date).toLocaleDateString("de-DE");

    expect(screen.getByText(tx.description)).toBeInTheDocument();

    const amountEl = screen.getByText(expectedAmount);
    expect(amountEl).toBeInTheDocument();
    expect(amountEl.closest("div")).toHaveClass("text-success");
    expect(screen.getByText(expectedDate)).toBeInTheDocument();
  });
});
