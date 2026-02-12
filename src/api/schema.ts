import { z } from "zod";

const cardSchema = z.object({
  id: z.string().min(1),
  description: z.string().min(1),
  type: z.enum(["private", "business", "debit", "credit", "travel", "other"]),
  lastDigits: z.number().optional(),
});

export const cardsSchema = z.array(cardSchema);

const transactionSchema = z.object({
  id: z.string().min(1),
  amount: z.number(),
  description: z.string().min(1),
  type: z.enum(["debit", "credit"]),
  date: z.iso.datetime(),
});

export const transactionsByCardIdSchema = z.record(
  z.string(),
  z.array(transactionSchema),
);
