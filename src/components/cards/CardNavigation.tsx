import { Button } from "@/components/ui";

interface CardNavigationProps {
  canPrev: boolean;
  canNext: boolean;
  prev: () => void;
  next: () => void;
  pageInfo: string;
}

/**
 * A component to display card navigation controls.
 * It displays previous and next buttons, and a page info string.
 * The previous and next buttons are only displayed if the corresponding
 * `canPrev` and `canNext` props are true.
 * The page info string is displayed in the center of the component.
 *
 * @param {CardNavigationProps} props - The props for the component
 * @param {boolean} props.canPrev - Whether to display the previous button
 * @param {boolean} props.canNext - Whether to display the next button
 * @param {() => void} props.prev - The function to call when the previous button is clicked
 * @param {() => void} props.next - The function to call when the next button is clicked
 * @param {string} props.pageInfo - The page info string to display
 */
export function CardNavigation({
  canPrev,
  canNext,
  prev,
  next,
  pageInfo,
}: CardNavigationProps) {
  const navButtonClass =
    "bg-background hover:bg-foreground/5 h-10 w-10 rounded-full p-0";

  return (
    <div className="flex w-full items-center">
      <div className="flex-1">
        {canPrev && (
          <Button
            title="Previous"
            onClick={prev}
            aria-label="Previous cards"
            className={navButtonClass}
          >
            <span className="leading-none">&#x2B05;</span>
          </Button>
        )}
      </div>
      <div className="flex-1 justify-center">{pageInfo}</div>
      <div className="justify-end">
        {canNext && (
          <Button
            title="Next"
            onClick={next}
            aria-label="Next cards"
            className={navButtonClass}
          >
            <span className="leading-none">&#x27A1;</span>
          </Button>
        )}
      </div>
    </div>
  );
}
