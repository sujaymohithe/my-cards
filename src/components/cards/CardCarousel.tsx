import type { Card } from "@/domain/types";
import { cn } from "@/lib";
import { CardItem } from "./CardItem";
import { useIsSmallerViewport } from "@/hooks";
import { useMemo, useState } from "react";
import { CardNavigation } from "./CardNavigation";

interface CardCarouselProps {
  cards: Card[];
  selectedCardId: string | null;
  onSelect: (cardId: string) => void;
  loading: boolean;
}

/**
 * A component to display a responsive carousel of cards.
 * It takes an array of `Card` objects and displays a subset of them.
 * The number of cards displayed is determined by the screen size.
 * On mobile, it displays 1 card, while on non-mobile devices, it displays 2 cards.
 * It also provides navigation controls to move between the cards.
 * Desktop (2-up): 5 cards, 2 per page [1,2] -> [3,4] -> [5]
 * Mobile (1-up): 5 cards, 1 per page [1] -> [2] -> [3] -> [4] -> [5]
 * @param {CardCarouselProps} props - The props for the component
 * @returns A JSX element representing the card carousel
 */
export function CardCarousel({
  cards,
  selectedCardId,
  onSelect,
  loading,
}: CardCarouselProps) {
  const isSmallerViewport = useIsSmallerViewport();
  // Show 1 card on mobile, 2 cards on larger screens
  const visibleCount = isSmallerViewport ? 1 : 2;

  // Store the starting index of the current page
  const [startIndex, setStartIndex] = useState(0);
  const total = cards.length;

  // Calculate total number of grouped pages - Example (5 cards, 2 per page): ceil(5/2) = 3 pages
  const pageCount = Math.max(1, Math.ceil(total / visibleCount));

  // The maximum valid starting index for grouped paging
  // Example (5 cards, 2 per page): starts = 0, 2, 4
  const maxStart = (pageCount - 1) * visibleCount;

  // Snap startIndex to a valid group boundary (0, 2, 4, ...)
  const safeStart = Math.min(
    Math.floor(startIndex / visibleCount) * visibleCount,
    maxStart,
  );

  const visibleCards = useMemo(
    () => cards.slice(safeStart, safeStart + visibleCount),
    [cards, safeStart, visibleCount],
  );

  const canPrev = safeStart > 0;
  const canNext = safeStart < maxStart;

  const prev = () => setStartIndex((s) => Math.max(0, s - visibleCount));

  const next = () => setStartIndex((s) => Math.min(maxStart, s + visibleCount));

  const pageInfo = useMemo(() => {
    const from = safeStart + 1;
    const to = Math.min(safeStart + visibleCount, total);
    const range = from === to ? `${from}` : `${from}-${to}`;
    return `Showing ${range} of ${total}`;
  }, [safeStart, visibleCount, total]);

  if (loading) {
    return (
      <div className="text-foreground/70 mx-auto w-full text-center">
        Loading cards…
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <CardNavigation
        canPrev={canPrev}
        canNext={canNext}
        prev={prev}
        next={next}
        pageInfo={pageInfo}
      />

      <div className="grid place-items-center gap-4 sm:grid-cols-2 sm:place-items-start">
        {visibleCards.map((card, index) => (
          <div
            key={card.id}
            className={cn(
              "w-fit",
              index === 1 && "sm:justify-self-end",
              index === 0 && "sm:justify-self-start",
            )}
          >
            <CardItem
              card={card}
              selected={card.id === selectedCardId}
              onSelect={() => onSelect(card.id)}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
