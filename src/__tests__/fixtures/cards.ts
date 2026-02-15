import type { Card } from "@/domain/types";

export const mockCards: Card[] = [
  {
    id: "card-1",
    description: "Card 1",
    lastDigits: 1234,
    type: "private",
  },
  {
    id: "card-2",
    description: "Card 2",
    lastDigits: 5678,
    type: "travel",
  },
  {
    id: "card-3",
    description: "Card 3",
    lastDigits: 9012,
    type: "other",
  },
];

export const singleCard: Card = mockCards[0];
export const travelCard: Card = mockCards[1];
