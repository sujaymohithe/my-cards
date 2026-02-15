import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { ErrorBanner } from "@/components/ui";

describe("ErrorBanner", () => {
  it("renders the component with the correct text and styles", () => {
    render(<ErrorBanner code="Error" message="Something went wrong" />);
    const error = screen.getByText("Error");

    expect(error).toBeInTheDocument();
    expect(screen.getByText("Something went wrong")).toBeInTheDocument();
    expect(screen.getByTestId("error-banner")).toHaveClass(
      "border-error/40",
      "bg-error/10",
    );
    expect(error.closest("div")).toHaveClass("text-error");
  });
});
