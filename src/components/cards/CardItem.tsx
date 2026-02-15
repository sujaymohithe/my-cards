import type { Card } from "@/domain/types";
import { cn } from "@/lib";
import { Button } from "@/components/ui";
import { CARD_COLORS } from "@/theme";

interface CardItemProps {
  card: Card;
  selected: boolean;
  onSelect: () => void;
}

/**
 * A component to render a single card item.
 * It displays the card description and last 4 digits (if available).
 * It also applies a background color based on the card type.
 * It can be selected, which adds a border, ring, and shadow.
 *
 * @param {CardItemProps} props - The props for the component
 * @returns A JSX element representing the card item
 */
export function CardItem({ card, selected, onSelect }: CardItemProps) {
  const bgClass = CARD_COLORS[card.type];

  return (
    <Button
      onClick={onSelect}
      aria-pressed={selected}
      className={cn(
        "h-48 w-88 rounded-2xl p-6 text-left transition",
        "flex flex-col items-start justify-start",
        selected
          ? "border-foreground ring-2 ring-foreground/40 shadow-md"
          : "border-foreground/10 hover:border-foreground/20 hover:shadow-sm",
        bgClass,
      )}
    >
      <div className="text-foreground text-lg font-semibold">
        {card.description}
      </div>
      {card.lastDigits && (
        <div className="text-foreground/70 mt-2 text-sm">
          •• {String(card.lastDigits).padStart(4, "0")}
        </div>
      )}
    </Button>
  );
}
