import type { Transaction } from "@/domain/types";

export const mockTransactions: Transaction[] = [
  {
    id: "t1",
    description: "Transaction 1",
    amount: 100,
    type: "debit",
    date: "2023-01-01",
  },
  {
    id: "t2",
    description: "Transaction 2",
    amount: 200.00,
    type: "credit",
    date: "2023-01-02",
  },
  {
    id: "t3",
    description: "Transaction 3",
    amount: 300.00,
    type: "debit",
    date: "2023-01-03",
  },
];

export const mockTransactionsByCardId: Record<string, Transaction[]> = {
  "card-1": mockTransactions.slice(0, 2),
  "card-2": mockTransactions.slice(2),
};
