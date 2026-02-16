# Card & Transactions Overview

This project is a React + TypeScript application displaying a card and transactions overview page where a user can:

- Select one of the available cards
- View transactions for the selected card
- Filter transactions by minimum amount
- Navigate through cards using a responsive carousel
- View a responsive UI across screen sizes

## Tech Stack

- React 18
- TypeScript
- Vite
- Tailwind CSS (v4)
- Zod (runtime validation)
- Vitest + React Testing Library (unit testing)

## Installation

This project uses Yarn.

```
yarn install
```

## Linting

```
yarn lint
```

## Run the Project

```
yarn dev
```

## Run Tests

```
yarn test
```

To run once (CI mode):

```
yarn test:run
```

## Functional Requirements Coverage

- User can select one of the cards
- Transactions of the selected card are displayed
- Transactions share the same background color as the selected card
- User can filter transactions by minimum amount
- Changing selected card resets filter input
- Responsive layout across screen sizes

## Design Adjustments & Scalability Considerations

The provided design illustrated a static layout with a limited number of cards.

To support scalability and ensure predictable behavior when additional cards are present, a lightweight grouped carousel navigation was introduced.

This allows:
- Controlled navigation when the number of cards exceeds available horizontal space
- Consistent layout behavior across different screen sizes
- Clear visual grouping (e.g., [1,2] → [3,4] → [5])

The overall visual structure and hierarchy from the original design were preserved. The carousel was added purely to improve scalability and usability for dynamic datasets.

Additionally:
- Improved selected card visual state for clearer distinction.
- Transaction type (credit/debit) and date were introduced to enhance realism.
- Minor responsive refinements were made to align layout behavior with actual viewport constraints.

If collaborating with a designer, I would:
- Confirm whether scroll-based or button-based navigation is preferred.
- Align on interaction patterns for growing datasets.
- Ensure any new interaction components fit within the existing design system.

All enhancements were made conservatively to respect the original layout intent.



## Further Documentation

For documentation on:
- [Architecture](docs/architecture.md)
- [Data Model](docs/data-model.md)
- [Technical Decisions](docs/decisions.md)
- [Future Improvements](docs/future-improvements.md)
