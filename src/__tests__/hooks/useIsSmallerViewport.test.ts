import { describe, it, expect, beforeEach } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useIsSmallerViewport } from "@/hooks";

describe("useIsSmallerViewport", () => {
  beforeEach(() => {
    Object.defineProperty(window, "innerWidth", {
      writable: true,
      configurable: true,
      value: 1024,
    });
  });

  it("returns false when viewport is larger than breakpoint", () => {
    window.innerWidth = 1000;

    const { result } = renderHook(() => useIsSmallerViewport());

    expect(result.current).toBe(false);
  });

  it("returns true when viewport is smaller than breakpoint", () => {
    window.innerWidth = 500;

    const { result } = renderHook(() => useIsSmallerViewport());

    expect(result.current).toBe(true);
  });

  it("updates value when window is resized", () => {
    window.innerWidth = 1000;

    const { result } = renderHook(() => useIsSmallerViewport());
    expect(result.current).toBe(false);

    act(() => {
      window.innerWidth = 500;
      window.dispatchEvent(new Event("resize"));
    });

    expect(result.current).toBe(true);
  });
});
