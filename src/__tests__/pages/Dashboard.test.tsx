import { beforeEach, describe, expect, it, vi } from "vitest";
import { mockCards } from "../fixtures/cards";
import { mockTransactionsByCardId } from "../fixtures/transactions";
import { render, screen } from "@testing-library/react";
import type { AppError } from "@/utils";
import { Dashboard } from "@/pages/Dashboard";
import type { Card, CardType, Transaction } from "@/domain/types";
import { useCards, useTransactions } from "@/hooks";
import userEvent from "@testing-library/user-event";

// By intentionally avoiding below line here to keep the test decoupled from the component implementation.
// type CardCarouselProps = ComponentProps<typeof CardCarousel>;
type CardCarouselProps = {
  cards: Card[];
  selectedCardId: string | null;
  onSelect: (cardId: string) => void;
  loading: boolean;
};

type AmountFilterProps = {
  displayValue: string;
  onChange: (value: string) => void;
  onBlur: () => void;
  disabled?: boolean;
};

type TransactionListProps = {
  transactions: Transaction[];
  loading: boolean;
  cardType: CardType;
};

vi.mock("@/hooks", () => ({
  useCards: vi.fn(),
  useTransactions: vi.fn(),
}));

vi.mock("@/components/ui", () => ({
  ErrorBanner: ({ code, message }: { code: string; message: string }) => (
    <div data-testid="error-banner">
      {code} | {message}
    </div>
  ),
  Section: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="section">{children}</div>
  ),
}));

vi.mock("@/components/cards", () => ({
  CardCarousel: ({
    cards,
    selectedCardId,
    onSelect,
    loading,
  }: CardCarouselProps) => (
    <div
      data-testid="card-carousel"
      data-loading={String(loading)}
      data-selected={selectedCardId}
    >
      {cards.map((card) => (
        <button
          key={card.id}
          data-testid={`select-card-${card.id}`}
          onClick={() => onSelect(card.id)}
        >
          select {card.id}
        </button>
      ))}
    </div>
  ),
}));

vi.mock("@/components/filter", () => ({
  AmountFilter: ({
    displayValue,
    onChange,
    onBlur,
    disabled,
  }: AmountFilterProps) => (
    <div data-testid="amount-filter" data-disabled={String(disabled)}>
      <input
        data-testid="amount-input"
        value={displayValue}
        onChange={(e) => onChange((e.target as HTMLInputElement).value)}
        onBlur={onBlur}
        disabled={disabled}
      />
    </div>
  ),
}));

vi.mock("@/components/transactions", () => ({
  TransactionList: ({
    transactions,
    loading,
    cardType,
  }: TransactionListProps) => (
    <div
      data-testid="transaction-list"
      data-loading={String(loading)}
      data-cardtype={cardType}
    >
      {transactions.map((t) => (
        <div key={t.id} data-testid={`tx-${t.id}`}>
          {t.description}-{t.amount}
        </div>
      ))}
    </div>
  ),
}));

const useCardsMock = vi.mocked(useCards);
const useTransactionsMock = vi.mocked(useTransactions);

function setup({
  loadingCards = false,
  cardsError = null as null | AppError,
  loadingTransactions = false,
  transactionsError = null as null | AppError,
} = {}) {
  useCardsMock.mockReturnValue({
    cards: mockCards,
    loading: loadingCards,
    error: cardsError,
  });

  useTransactionsMock.mockImplementation((cardId: string) => ({
    transactions: mockTransactionsByCardId[cardId] ?? [],
    loading: loadingTransactions,
    error: transactionsError,
  }));

  return render(<Dashboard />);
}

describe("Dashboard", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders the dashboard", () => {
    setup();

    expect(screen.getByTestId("card-carousel")).toBeInTheDocument();
    expect(screen.getByTestId("amount-filter")).toBeInTheDocument();
    expect(screen.getByTestId("transaction-list")).toBeInTheDocument();
  });

  it("shows error banner if an error exists", () => {
    setup({ cardsError: { code: "INTERNAL_ERROR", message: "Cards failed" } });

    expect(screen.getByTestId("error-banner")).toHaveTextContent(
      "INTERNAL_ERROR",
    );
  });

  it("defaults to the first card and renders its transactions", () => {
    setup();

    expect(screen.getByTestId("card-carousel")).toHaveAttribute(
      "data-selected",
      mockCards[0].id,
    );
    expect(screen.getByTestId("transaction-list")).toHaveAttribute(
      "data-cardtype",
      mockCards[0].type,
    );
    expect(screen.getByTestId("tx-t1")).toBeInTheDocument();
    expect(screen.getByTestId("tx-t2")).toBeInTheDocument();
  });

  it("filters transactions based on amount input", async () => {
    const user = userEvent.setup();
    setup();

    expect(screen.getByTestId("tx-t1")).toBeInTheDocument();
    expect(screen.getByTestId("tx-t2")).toBeInTheDocument();

    const amountInput = screen.getByTestId("amount-input") as HTMLInputElement;

    await user.clear(amountInput);
    await user.type(amountInput, "150");

    expect(screen.queryByTestId("tx-t1")).not.toBeInTheDocument();
    expect(screen.getByTestId("tx-t2")).toBeInTheDocument();
  });

  it("on blur, formats the display value", async () => {
    const user = userEvent.setup();
    setup();

    const amountInput = screen.getByTestId("amount-input") as HTMLInputElement;

    await user.type(amountInput, "1000");
    expect(amountInput.value).toBe("1000");

    await user.tab();

    expect(amountInput.value).toBe("1.000,00");
  });

  it("selecting a card switches transactions and resets the filter display", async () => {
    const user = userEvent.setup();
    setup();
    const amountInput = screen.getByTestId("amount-input") as HTMLInputElement;

    await user.type(amountInput, "100");
    expect(amountInput.value).toBe("100");

    await user.click(screen.getByTestId(`select-card-${mockCards[1].id}`));
    expect(screen.getByTestId("card-carousel")).toHaveAttribute(
      "data-selected",
      mockCards[1].id,
    );
    expect(screen.getByTestId("transaction-list")).toHaveAttribute(
      "data-cardtype",
      mockCards[1].type,
    );
    expect(screen.getByTestId("tx-t3")).toBeInTheDocument();
    expect((screen.getByTestId("amount-input") as HTMLInputElement).value).toBe(
      "",
    );
  });
});
