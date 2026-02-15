import { CardNavigation } from "@/components/cards";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

describe("CardNavigation", () => {
  it("renders page info", () => {
    render(
      <CardNavigation
        canPrev={false}
        canNext={false}
        prev={vi.fn()}
        next={vi.fn()}
        pageInfo="Showing 1-2 of 3"
      />,
    );

    expect(screen.getByText("Showing 1-2 of 3")).toBeInTheDocument();
  });

  it("does not render prev/next buttons when disabled", () => {
    render(
      <CardNavigation
        canPrev={false}
        canNext={false}
        prev={vi.fn()}
        next={vi.fn()}
        pageInfo="Showing 1-2 of 2"
      />,
    );

    expect(
      screen.queryByRole("button", { name: /previous cards/i }),
    ).not.toBeInTheDocument();

    expect(
      screen.queryByRole("button", { name: /next cards/i }),
    ).not.toBeInTheDocument();
  });

  it("renders prev/next buttons when enabled", () => {
    render(
      <CardNavigation
        canPrev
        canNext
        prev={vi.fn()}
        next={vi.fn()}
        pageInfo="Showing 3-4 of 5"
      />,
    );

    expect(
      screen.getByRole("button", { name: /previous cards/i }),
    ).toBeInTheDocument();

    expect(
      screen.getByRole("button", { name: /next cards/i }),
    ).toBeInTheDocument();
  });

  it("calls prev/next handlers on click", async () => {
    const user = userEvent.setup();
    const prev = vi.fn();
    const next = vi.fn();

    render(
      <CardNavigation
        canPrev
        canNext
        prev={prev}
        next={next}
        pageInfo="Showing 3-4 of 5"
      />,
    );

    await user.click(screen.getByRole("button", { name: /previous cards/i }));
    await user.click(screen.getByRole("button", { name: /next cards/i }));

    expect(prev).toHaveBeenCalledTimes(1);
    expect(next).toHaveBeenCalledTimes(1);
  });
});
