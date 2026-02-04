# Development Approach & Technical Documentation

## Development Approach

This application was built following a component-based architecture with custom hooks for reusable logic. The implementation prioritizes:

1. **Separation of Concerns**: API logic in services, UI in components, state/effects in hooks
2. **Progressive Enhancement**: Core table renders first; infinite scroll and editing are additive
3. **Accessibility**: Semantic HTML, ARIA labels, keyboard support for editable titles

## Architecture Overview

### Component Hierarchy

```
App
└── ProductsTable
    ├── EditableTitleCell (inline in ProductsTable)
    ├── table (thead, tbody)
    ├── loading indicator
    ├── error message
    └── scroll sentinel (for Intersection Observer)
```

### State Management

- **Local state only** (useState) – no global store
- **useInfiniteProducts** manages: products array, loading, error, hasMore, skip
- **ProductsTable** receives props and calls `loadMore` / `updateProductTitle` via callbacks
- Title edits are stored in React state; no persistence to API (per assignment scope)

### Data Flow

1. **Initial Load**: `useEffect` in `useInfiniteProducts` calls `loadProducts(true)` on mount
2. **Load More**: Intersection Observer triggers when sentinel enters viewport → `loadMore()` → `fetchProducts(skip, limit)` → append to products
3. **Edit Title**: User clicks title → `EditableTitleCell` switches to input → on blur/Enter → `updateProductTitle(id, newTitle)` updates state

## Challenges & Solutions

### 1. Infinite Scroll Without External Libraries

**Challenge**: Implement infinite scroll using Intersection Observer without React Table or similar libs.

**Solution**: Custom `useIntersectionObserver` hook that observes a sentinel element at the bottom of the table. When it enters the viewport, a callback fires to load the next page. The sentinel is a 1px invisible div; `rootMargin` gives a small buffer so loading starts before the user reaches the end.

### 2. Editable Title UX

**Challenge**: Allow inline editing of product names with clear affordance and keyboard support.

**Solution**: Dual-mode `EditableTitleCell`: display mode (clickable span) and edit mode (input). Click or Enter/Space to edit; Enter to save, Escape to cancel; blur to save. Focus styles and hover states make it clear the title is editable.

### 3. Pagination State

**Challenge**: Avoid duplicate fetches and keep skip/limit in sync with loaded products.

**Solution**: `skip` is incremented only after a successful fetch. `loadMore` is guarded by `!loading && hasMore`, so overlapping requests are prevented. Reset on refetch uses `skip = 0` and clears the products array.

## Technical Decisions

| Decision | Rationale |
|----------|-----------|
| **Vite over CRA** | Faster dev server and builds; modern ESM tooling |
| **Custom hooks over context** | Simpler for this scope; no need for global state |
| **Native Intersection Observer** | No extra dependency; built-in browser API |
| **Vanilla CSS** | Assignment focus on logic; no UI library required |
| **No persistence for edits** | Assignment does not require backend; edits stay in memory |

## Testing Checklist

- [ ] Initial load shows first 10 products
- [ ] Scrolling to bottom loads more products
- [ ] Title is editable (click, type, Enter/blur)
- [ ] Escape cancels edit
- [ ] Table is responsive on narrow screens
- [ ] Error state shows if API fails
