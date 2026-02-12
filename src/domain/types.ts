export type CardType = "private" | "business" | "debit" | "credit" | "travel" | "other";

type TransactionType = "credit" | "debit";

export interface Card {
  id: string;
  description: string;
  type: CardType;
  lastDigits?: number;
}

export interface Transaction {
  id: string;
  description: string;
  amount: number;
  type: TransactionType;
  date: string;
}
