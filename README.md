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


## Further Documentation

For documentation on:
- [Architecture](docs/architecture.md)
- [Data Model](docs/data-model.md)
- [Technical Decisions](docs/decisions.md)
- [Future Improvements](docs/future-improvements.md)
