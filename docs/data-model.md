# Data Model

The provided mock data was extended to better support realistic UI behavior.

## Card

Extended with:

- `type: "private" | "business" | "debit" | "credit" | "travel" | "other"`
  - Determines the visual identity of the card.

- `lastDigits?: number`
  - Used to display masked card numbers in the UI instead of the full identifier.

## Transaction

Extended with:

- `type: "debit" | "credit"`
  - Distinguishes outgoing and incoming transactions.

- `date: ISO datetime string`
  - Used for displaying and formatting the transaction date.
