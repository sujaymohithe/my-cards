import { apiClient } from "@/api/ApiClient";
import { useTransactions } from "@/hooks";
import { mapErrorToMessage, type AppError } from "@/utils";
import { waitFor } from "@testing-library/dom";
import { renderHook } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { mockTransactionsByCardId } from "../fixtures/transactions";

vi.mock("@/api/ApiClient", () => ({
  apiClient: {
    getTransactions: vi.fn(),
  },
}));

vi.mock("@/utils", () => ({
  mapErrorToMessage: vi.fn(),
}));

const getTransactionsMock = vi.mocked(apiClient.getTransactions);
const mapErrorToMessageMock = vi.mocked(mapErrorToMessage);

describe("useTransactions", () => {
  it("does nothing when cardId is empty", async () => {
    const { result } = renderHook(() => useTransactions(""));

    expect(result.current.transactions).toEqual([]);
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBeNull();
    expect(getTransactionsMock).not.toHaveBeenCalled();
  });

  it("loads transactions successfully", async () => {
    getTransactionsMock.mockResolvedValue(mockTransactionsByCardId["card-1"]);

    const { result } = renderHook(() => useTransactions("card-1"));

    expect(result.current.loading).toBe(true);

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(getTransactionsMock).toHaveBeenCalledWith("card-1");
    expect(result.current.transactions).toEqual(mockTransactionsByCardId["card-1"]);
    expect(result.current.error).toBeNull();
  });

  it("handles API error correctly", async () => {
      const apiError = new Error("Network error");
      const mappedError = { code: "NETWORK_ERROR", message: "Failed" };
  
      getTransactionsMock.mockRejectedValue(apiError);
      mapErrorToMessageMock.mockReturnValue(mappedError as AppError);
  
      const { result } = renderHook(() => useTransactions("card-1"));
  
      await waitFor(() => {
        expect(result.current.loading).toBe(false);
      });
  
      expect(mapErrorToMessageMock).toHaveBeenCalledWith(
        apiError,
        "Failed to load transactions",
      );
      expect(result.current.transactions).toEqual([]);
      expect(result.current.error).toEqual(mappedError);
    });
});
