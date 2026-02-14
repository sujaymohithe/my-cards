# Data Model

The provided mock data was extended to better support realistic UI behavior.

## Card

Extended with:

- `type: "private" | "business" | "debit" | "credit" | "travel" | "other"`
  - type is used to apply type-based styling via CSS variables and custom Tailwind utilities, enabling visual differentiation between cards (for the requirement - The transactions have a same background color as the card).

- `lastDigits?: number`
  - Used to display masked card numbers in the UI instead of card id.

## Transaction

Extended with:

- `type: "debit" | "credit"`
  - Used to visually distinguish outgoing and incoming transactions.

- `date: ISO datetime string`
  - Used for displaying the transaction date.
