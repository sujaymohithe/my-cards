import { TextInput } from "@/components/ui";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

describe("TextInput", () => {
  it("renders the component", () => {
    render(<TextInput />);
    expect(screen.getByRole("textbox")).toBeInTheDocument();
  });

  it("calls onChange with raw input value", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<TextInput onChange={onChange} />);

    const input = screen.getByRole("textbox");
    await user.type(input, "test");

    expect(onChange).toHaveBeenCalledTimes(4);
    expect(input).toHaveValue("test");
  });

  it("forwards all other props like placeholder", () => {
    render(<TextInput placeholder="Enter text" />);
    const input = screen.getByPlaceholderText("Enter text");
    expect(input).toHaveAttribute("placeholder", "Enter text");
  });

  it("applies disabled styles and attributes", () => {
    render(<TextInput disabled />);
    const input = screen.getByRole("textbox");

    expect(input).toBeDisabled();
    expect(input).toHaveClass("disabled:cursor-not-allowed", "disabled:opacity-40", "disabled:bg-foreground/10");
  });

  it("forwards type and other input props", async () => {
    const user = userEvent.setup();
    render(<TextInput type="text" inputMode="decimal" />);

    const input = screen.getByRole("textbox");
    expect(input).toHaveAttribute("type", "text");
    expect(input).toHaveAttribute("inputmode", "decimal");

    await user.type(input, "100.20");
    expect(input).toHaveValue("100.20");
  });
});
