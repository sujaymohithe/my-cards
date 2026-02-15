import { render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { CardCarousel } from "@/components/cards";
import { useIsSmallerViewport } from "@/hooks";
import type { ComponentProps } from "react";
import userEvent from "@testing-library/user-event";
import type { Card } from "@/domain/types";
import { mockCards } from "@/__tests__/fixtures/cards";

type CardItemProps = { card: Card; selected: boolean; onSelect: () => void };
type CardNavigationProps = {
  canPrev: boolean;
  canNext: boolean;
  prev: () => void;
  next: () => void;
  pageInfo: string;
};

vi.mock("@/hooks", () => ({
  useIsSmallerViewport: vi.fn(),
}));

vi.mock("@/components/cards/CardItem", () => ({
  CardItem: ({ card, selected, onSelect }: CardItemProps) => (
    <div data-testid={`card-item-${card.id}`} data-selected={selected}>
      {card.description}
      <button onClick={onSelect} data-testid={`select-${card.id}`} />
    </div>
  ),
}));

vi.mock("@/components/cards/CardNavigation", () => ({
  CardNavigation: ({
    canPrev,
    canNext,
    prev,
    next,
    pageInfo,
  }: CardNavigationProps) => (
    <div data-testid="navigation">
      {canPrev && <button onClick={prev} data-testid="prev" title="Previous" />}
      {pageInfo}
      {canNext && <button onClick={next} data-testid="next" title="Next" />}
    </div>
  ),
}));

const useIsSmallerViewportMock = vi.mocked(useIsSmallerViewport);

const makeProps = (
  overrides: Partial<ComponentProps<typeof CardCarousel>> = {},
): ComponentProps<typeof CardCarousel> => ({
  cards: mockCards,
  selectedCardId: null,
  onSelect: vi.fn(),
  loading: false,
  ...overrides,
});

const renderCardCarousel = (
  overrides: Partial<ComponentProps<typeof CardCarousel>> = {},
) => render(<CardCarousel {...makeProps(overrides)} />);

describe("CardCarousel", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    useIsSmallerViewportMock.mockReturnValue(false);
  });

  it("renders 2 visible cards on non-mobile", () => {
    renderCardCarousel();
    expect(screen.getAllByTestId(/^card-item-/)).toHaveLength(2);
  });

  it("renders 1 visible card on mobile", () => {
    useIsSmallerViewportMock.mockReturnValue(true);
    renderCardCarousel();
    expect(screen.getAllByTestId(/^card-item-/)).toHaveLength(1);
  });

  it("shows correct pagination text for first page", () => {
    renderCardCarousel();
    expect(screen.getByText("Showing 1-2 of 3")).toBeInTheDocument();
  });

  it('renders no cards when "cards" prop is empty', () => {
    renderCardCarousel({ cards: [] });
    expect(screen.queryAllByTestId(/^card-item-/)).toHaveLength(0);
  });

  it("hides prev/next buttons on a single page", () => {
    renderCardCarousel({ cards: mockCards.slice(0, 1) });

    expect(screen.queryByTitle("Previous")).not.toBeInTheDocument();
    expect(screen.queryByTitle("Next")).not.toBeInTheDocument();
  });

  it("hides prev button on the first page and shows next button", () => {
    renderCardCarousel();

    expect(screen.queryByTitle("Previous")).not.toBeInTheDocument();
    expect(screen.queryByTitle("Next")).toBeInTheDocument();
  });

  it("navigates next and hides next on the last page", async () => {
    const user = userEvent.setup();
    renderCardCarousel();

    await user.click(screen.getByTitle("Next"));

    expect(screen.getByText("Showing 3 of 3")).toBeInTheDocument();
    expect(screen.queryByTitle("Next")).not.toBeInTheDocument();
  });

  it("navigates prev back to first page and hides prev", async () => {
    const user = userEvent.setup();
    renderCardCarousel();

    await user.click(screen.getByTitle("Next"));
    expect(screen.getByText("Showing 3 of 3")).toBeInTheDocument();

    await user.click(screen.getByTitle("Previous"));
    expect(screen.getByText("Showing 1-2 of 3")).toBeInTheDocument();
    expect(screen.queryByTitle("Previous")).not.toBeInTheDocument();
  });

  it("calls onSelect with card id", async () => {
    const user = userEvent.setup();
    const onSelect = vi.fn();

    renderCardCarousel({ onSelect });

    await user.click(screen.getByTestId("select-card-1"));
    expect(onSelect).toHaveBeenCalledWith("card-1");
  });

  it("highlights the selected card when selectedCardId is provided", () => {
    renderCardCarousel({ selectedCardId: "card-1" });
    expect(screen.getByTestId("card-item-card-1")).toHaveAttribute(
      "data-selected",
      "true",
    );
  });
});
