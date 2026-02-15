import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { Dashboard } from "@/pages/Dashboard";
import { useCards, useIsSmallerViewport, useTransactions } from "@/hooks";
import { mockCards } from "../fixtures/cards";
import { mockTransactionsByCardId } from "../fixtures/transactions";


vi.mock("@/hooks", () => ({
  useCards: vi.fn(),
  useTransactions: vi.fn(),
  useIsSmallerViewport: vi.fn(),
}));

const useCardsMock = vi.mocked(useCards);
const useTransactionsMock = vi.mocked(useTransactions);
const useIsSmallerViewportMock = vi.mocked(useIsSmallerViewport);

beforeEach(() => {
  vi.clearAllMocks();

  useCardsMock.mockReturnValue({
    cards: mockCards,
    loading: false,
    error: null,
  });

  useTransactionsMock.mockImplementation((cardId: string) => ({
    transactions: mockTransactionsByCardId[cardId] ?? [],
    loading: false,
    error: null,
  }));

  useIsSmallerViewportMock.mockReturnValue(false);
});

describe("Dashboard integration", () => {
  it("selecting a card updates the transaction list and keeps consistent background", async () => {
    const user = userEvent.setup();
    render(<Dashboard />);

    expect(screen.getByText("Transaction 1")).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: /card 2/i }));
    expect(screen.queryByText("Transaction 1")).not.toBeInTheDocument();
    expect(screen.getByText("Transaction 3")).toBeInTheDocument();

    const tx = screen.getByTestId("transaction-t3");
    expect(tx).toHaveClass("bg-[var(--color-card-travel)]");
  });

  it("typing amount filters the visible transactions", async () => {
    const user = userEvent.setup();
    render(<Dashboard />);

    const input = screen.getByPlaceholderText(/amount/i);

    await user.type(input, "150");

    expect(screen.queryByText("Transaction 1")).not.toBeInTheDocument();
    expect(screen.getByText("Transaction 2")).toBeInTheDocument();
  });

  it("selecting a card resets the amount filter", async () => {
    const user = userEvent.setup();
    render(<Dashboard />);

    const input = screen.getByPlaceholderText(/amount/i);

    await user.type(input, "150");
    expect(input).toHaveValue("150");
    
    await user.click(screen.getByRole("button", { name: /card 2/i }));

    expect(input).toHaveValue("");
  });
});
