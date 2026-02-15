# Technical Decisions

## 1. Extended Card Model

**Decision:** Add `type` and `lastDigits` to the Card model.

**Reason:**
- `type` enables a card theme system (`CARD_COLORS`) for better UX.
- `lastDigits` allows realistic masked card display.

**Impact:**
Improves UI clarity and allows easy styling without hardcoding presentation logic.

---

## 2. Extended Transaction Model

**Decision:** Add `type` and `date` to Transaction.

**Reason:**
- `type` differentiates debit and credit transactions.
- `date` allows formatting and future sorting capabilities.

**Impact:**
Enables richer transaction display and improves realism of the overview page.

---

## 3. Client-Side Filtering

**Decision:** Filter transactions on the client.

**Reason:**
Scope of challenge is frontend-focused. No need for server-side filtering.

**Impact:**
Simpler implementation, acceptable for small dataset.

## 4. Grouped Carousel Paging

**Decision:**  Use grouped paging (e.g., [1,2] → [3,4] → [5] on large screens and [1] → [2] → [3] → [4] → [5] on mobile) instead of sliding window.

**Reason:**
- Predictable navigation
- Avoids visual overlap between pages
- Matches traditional pagination behavior

**Impact:**
Improves clarity and prevents unexpected layout shifts when resizing.

## 5. Styling Approach

**Decision:**  Use Tailwind CSS.

**Reason:**
- Rapid UI development
- Consistent spacing system
- Avoid custom CSS sprawl
- Production-grade utility approach

**Impact:**
Cleaner components and predictable styling.
