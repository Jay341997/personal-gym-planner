# State and Data

## Summary

State and data concerns are spread across Redux store wiring, per-page data modules, shared services, and utility/helper layers.

## Key facts

- Global Redux setup lives under `src/store/`.
- Page modules often keep their own `data/` folders for route-level fetching and reducers.
- Shared API integration helpers live in `src/services/`.
- Generic logic is split across `src/helpers/` and `src/utils/`, which suggests a long-lived but somewhat overlapping abstraction boundary.
- `src/api/` and `src/cache/` indicate additional support layers for data handling and performance.

## Areas to understand together

- `src/store/`: store creation, root reducer, router integration
- `src/services/`: API wrappers and remote calls
- `src/helpers/`: formatting, cookie, auth, and integration helpers
- `src/utils/`: broader client/server utilities, analytics, posthog, language, and web app helpers
- `src/pages/*/data/`: page-scoped data fetching and reducers

## Current ambiguity

- The distinction between `helpers` and `utils` is not obvious from the top-level structure alone.
- Some business domains appear to keep state locally in page folders rather than in the global store.

## Evidence

- Code: src/store/
- Code: src/services/
- Code: src/helpers/
- Code: src/utils/
- Code: src/pages/

## Related pages

- [Codebase Map](./Codebase-Map.md)
- [App Shell](./App-Shell.md)
- [Open Questions](./Open-Questions.md)
