import { Button } from "@/components/ui";
import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import userEvent from "@testing-library/user-event";

describe("Button component", () => {
  it("renders button with correct text", () => {
    render(<Button>Click</Button>);
    expect(screen.getByRole("button")).toHaveTextContent("Click");
  });

  it("calls onClick when clicked", async () => {
    const user = userEvent.setup();
    const mockOnClick = vi.fn();
    render(<Button onClick={mockOnClick}>Click</Button>);

    await user.click(screen.getByRole("button"));
    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });

  it("does not call on click when disabled", async () => {
    const user = userEvent.setup();
    const mockOnClick = vi.fn();
    render(
      <Button onClick={mockOnClick} disabled>
        Click
      </Button>,
    );

    await user.click(screen.getByRole("button"));
    expect(screen.getByRole("button")).toBeDisabled();
    expect(mockOnClick).not.toHaveBeenCalled();
  });

  it("applies className", () => {
    render(<Button className="custom-class">Click</Button>);
    expect(screen.getByRole("button")).toHaveClass("custom-class");
  });
});
