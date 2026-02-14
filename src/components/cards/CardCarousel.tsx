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
 *
 * @param {CardCarouselProps} props - The props for the component
 * @param {Card[]} props.cards - The array of `Card` objects to display
 * @param {string | null} props.selectedCardId - The ID of the selected card
 * @param {(cardId: string) => void} props.onSelect - The function to call when a card is selected
 * @param {boolean} props.loading - Whether the data is being loaded
 */
export function CardCarousel({
  cards,
  selectedCardId,
  onSelect,
  loading,
}: CardCarouselProps) {
  const isSmallerViewport = useIsSmallerViewport();
  // Display 1 card on mobile, 2 cards on non-mobile
  const visibleCount = isSmallerViewport ? 1 : 2;

  const [page, setPage] = useState(0);
  const pageCount = useMemo(
    () => Math.max(1, Math.ceil(cards.length / visibleCount)),
    [cards.length, visibleCount],
  );

  const safePage = Math.min(page, pageCount - 1);
  const start = safePage * visibleCount;

  const visibleCards = useMemo(
    () => cards.slice(start, start + visibleCount),
    [cards, start, visibleCount],
  );

  const canPrev = safePage > 0;
  const canNext = safePage < pageCount - 1;

  const prev = () => setPage((p) => Math.max(0, p - 1));
  const next = () => setPage((p) => Math.min(pageCount - 1, p + 1));

  const getPageInfo = () => {
    const from = start + 1;
    const to = Math.min(start + visibleCount, cards.length);

    const range = from === to ? `${from}` : `${from}-${to}`;
    return `Showing ${range} of ${cards.length}`;
  };

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
        pageInfo={getPageInfo()}
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
