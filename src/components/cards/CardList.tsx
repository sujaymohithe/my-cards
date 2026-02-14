import type { Card } from "@/domain/types";
import { cn } from "@/lib";
import { CardItem } from "./CardItem";

interface CardListProps {
  cards: Card[];
  selectedCardId: string | null;
  onSelect: (cardId: string) => void;
  loading: boolean;
}

export function CardList({
  cards,
  selectedCardId,
  onSelect,
  loading,
}: CardListProps) {
  if (loading) {
    return (
      <div className="text-foreground/70 mx-auto w-full text-center">
        Loading cards…
      </div>
    );
  }

  return (
    <div className="flex flex-row items-center justify-center gap-4">
      {cards.map((card, index) => (
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
  );
}
