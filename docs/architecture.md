# Architecture Overview

## Application Structure

The application follows a simple layered frontend architecture:

- **UI Layer** – React components (CardCarousel, TransactionList, AmountFilter)
- **Hooks Layer** – useCards, useTransactions, useIsSmallerViewport
- **Domain Layer** – Type definitions and Zod schemas
- **Infrastructure Layer** – apiClient (mocked API abstraction)

## Data Flow

1. useCards() loads all cards.
2. User selects a card.
3. useTransactions(cardId) loads transactions for selected card.
4. Transactions are filtered client-side based on amount filter.

## Error Handling

All API errors are mapped to a normalized `AppError` type using `mapErrorToMessage`.

## State Management

Local React state is used. No global state library was required due to limited scope.

## Responsive Strategy

Custom breakpoints were defined to align with real layout constraints.

The `CardItem` component uses a fixed width (`w-88`). Default Tailwind
breakpoints caused premature layout wrapping. Therefore, breakpoints
were adjusted to match the actual viewport width at which layout changes occur.

A small `useIsSmallerViewport` hook is used where JS-driven responsive
behavior is required. The hook’s default breakpoint (780px) matches
the custom `sm` breakpoint to keep CSS and JS behavior consistent.

This approach ensures:
- Predictable responsive behavior
- No layout-specific hacks inside components
- Centralized responsive configuration

## Data Validation

Zod is used to define and validate API response schemas.

Benefits:
- Runtime validation of mocked API data
- Type inference for TypeScript
- Clear contract between data layer and UI
- Safer refactoring

## Testing Strategy

Unit tests focus on:
- Card selection behavior
- Transaction filtering logic
- Carousel navigation logic
- Filter reset behavior

Tests emphasize behavioral outcomes rather than implementation details.

Integration Test: In addition to unit tests, a lightweight integration test is included for the Dashboard page to validate real component interaction.

The integration test verifies:

- Selecting a card updates the displayed transactions

- Applying a minimum amount filter hides transactions below the threshold

- Changing the selected card resets the filter state

This ensures that multiple components (CardCarousel, AmountFilter, TransactionList) work correctly together as expected.