import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { CardItem } from "@/components/cards";
import type { ComponentProps } from "react";
import { singleCard, travelCard } from "@/__tests__/fixtures/cards";

vi.mock("@/theme", () => ({
  CARD_COLORS: {
    private: "bg-private",
    travel: "bg-travel",
    other: "bg-other",
  },
}));

const makeProps = (
  overrides: Partial<ComponentProps<typeof CardItem>> = {},
): ComponentProps<typeof CardItem> => ({
  card: singleCard,
  selected: false,
  onSelect: vi.fn(),
  ...overrides,
});

describe("CardItem", () => {
  it("renders the component", () => {
    render(<CardItem {...makeProps()} />);

    expect(screen.getByRole("button")).toBeInTheDocument();
    expect(screen.getByText("Card 1")).toBeInTheDocument();
  });

  it("calls onSelect when clicked", async () => {
    const user = userEvent.setup();
    const props = makeProps();

    render(<CardItem {...props} />);

    await user.click(screen.getByRole("button"));
    expect(props.onSelect).toHaveBeenCalledTimes(1);
  });

  it("sets aria-pressed=true when selected", () => {
    render(<CardItem {...makeProps({ selected: true })} />);
    expect(screen.getByRole("button")).toHaveAttribute("aria-pressed", "true");
  });

  it("sets aria-pressed=false when not selected", () => {
    render(<CardItem {...makeProps()} />);
    expect(screen.getByRole("button")).toHaveAttribute("aria-pressed", "false");
  });

  it("applies selected styles when selected", () => {
    render(<CardItem {...makeProps({ selected: true })} />);
    expect(screen.getByRole("button")).toHaveClass("ring-2", "shadow-md");
  });

  it("applies unselected styles when not selected", () => {
    render(<CardItem {...makeProps()} />);
    expect(screen.getByRole("button")).toHaveClass(
      "hover:border-foreground/20",
      "hover:shadow-sm",
    );
  });

  it("applies correct background color from CARD_COLORS", () => {
    render(<CardItem {...makeProps()} />);
    expect(screen.getByRole("button")).toHaveClass("bg-private");
  });

  it("handles different card types showing the correct background color", () => {
    render(
      <CardItem
        {...makeProps({
          card: travelCard,
        })}
      />,
    );

    expect(screen.getByRole("button")).toHaveClass("bg-travel");
  });
});
