import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { AmountFilter } from "@/components/filter";
import userEvent from "@testing-library/user-event";

describe("AmountFilter", () => {
  it("renders the component", () => {
    render(
      <AmountFilter displayValue="" onChange={vi.fn()} onBlur={vi.fn()} />,
    );

    expect(screen.getByText("Amount Filter")).toBeInTheDocument();
    expect(screen.getByRole("textbox")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Amount")).toBeInTheDocument();
  });

  it("is disabled when disabled prop is true", () => {
    render(
      <AmountFilter
        displayValue=""
        onChange={vi.fn()}
        onBlur={vi.fn()}
        disabled
      />,
    );

    const input = screen.getByRole("textbox");
    expect(input).toBeDisabled();
  });

  it("calls onChange with raw input value", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(
      <AmountFilter displayValue="" onChange={onChange} onBlur={vi.fn()} />,
    );

    const input = screen.getByRole("textbox");
    await user.type(input, "1000");
    expect(onChange).toHaveBeenCalledTimes(4);
  });

  it("calls onBlur on blur", async () => {
    const user = userEvent.setup();
    const onBlur = vi.fn();
    render(<AmountFilter displayValue="" onChange={vi.fn()} onBlur={onBlur} />);

    const input = screen.getByRole("textbox");
    await user.type(input, "1000");
    await user.click(document.body);
    expect(onBlur).toHaveBeenCalledTimes(1);
  });

  it("shows displayValue from parent", () => {
    render(
      <AmountFilter
        displayValue="1.000,00"
        onChange={vi.fn()}
        onBlur={vi.fn()}
      />,
    );
    expect(screen.getByRole("textbox")).toHaveValue("1.000,00");
  });
});
