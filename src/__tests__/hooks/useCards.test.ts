import { apiClient } from "@/api/ApiClient";
import { mapErrorToMessage, type AppError } from "@/utils";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { mockCards } from "../fixtures/cards";
import { useCards } from "@/hooks";
import { renderHook, waitFor } from "@testing-library/react";

vi.mock("@/api/ApiClient", () => ({
  apiClient: {
    getCards: vi.fn(),
  },
}));

vi.mock("@/utils", () => ({
  mapErrorToMessage: vi.fn(),
}));

const getCardsMock = vi.mocked(apiClient.getCards);
const mapErrorToMessageMock = vi.mocked(mapErrorToMessage);

describe("useCards", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("loads cards successfully", async () => {
    getCardsMock.mockResolvedValue(mockCards);

    const { result } = renderHook(() => useCards());

    expect(result.current.loading).toBe(true);

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.cards).toEqual(mockCards);
    expect(result.current.error).toBeNull();
    expect(getCardsMock).toHaveBeenCalledTimes(1);
  });

  it("handles API error correctly", async () => {
    const apiError = new Error("Network error");
    const mappedError = { code: "NETWORK_ERROR", message: "Failed" };

    getCardsMock.mockRejectedValue(apiError);
    mapErrorToMessageMock.mockReturnValue(mappedError as AppError);

    const { result } = renderHook(() => useCards());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(mapErrorToMessageMock).toHaveBeenCalledWith(
      apiError,
      "Failed to load cards",
    );
    expect(result.current.cards).toEqual([]);
    expect(result.current.error).toEqual(mappedError);
  });
});
