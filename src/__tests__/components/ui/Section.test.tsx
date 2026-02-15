import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { Section } from "@/components/ui";

describe("Section", () => {
  it("renders the title", () => {
    render(<Section title="Section 1" />);
    expect(
      screen.getByRole("heading", { name: "Section 1" }),
    ).toBeInTheDocument();
  });

  it("doesn't render the title when missing", () => {
    render(
      <Section>
        <p>Child content</p>
      </Section>,
    );
    expect(screen.queryByRole("heading")).not.toBeInTheDocument();
  });

  it("renders the children", () => {
    render(
      <Section>
        <p>Child content</p>
      </Section>,
    );
    expect(screen.getByText("Child content")).toBeInTheDocument();
  });

  it("applies default and custom classes", () => {
    const { container } = render(
      <Section className="bg-red-500 p-8">Content</Section>,
    );
    const section = container.firstElementChild!;
    expect(section).toHaveClass("container", "space-y-4", "bg-red-500", "p-8");
  });
});
