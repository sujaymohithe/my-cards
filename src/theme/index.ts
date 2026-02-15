import type { CardType } from "@/domain/types";

export const CARD_COLORS: Record<CardType, string> = {
  private: "bg-[var(--color-card-private)]",
  business: "bg-[var(--color-card-business)]",
  debit: "bg-[var(--color-card-debit)]",
  credit: "bg-[var(--color-card-credit)]",
  travel: "bg-[var(--color-card-travel)]",
  other: "bg-[var(--color-card-other)]",
};
