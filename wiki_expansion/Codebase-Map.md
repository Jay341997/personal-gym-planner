# Codebase Map

## Summary

This page is the top-level index for the `amber-user-website` codebase wiki. It groups the repository by long-lived responsibilities so future pages can stay organized.

## Major areas

- `src/app/`: app shell, cross-cutting reducers, layout orchestration, and app-wide middleware
- `src/pages/`: route-driven page modules for discovery, conversion, account, and content flows
- `src/components/`: shared UI primitives and reusable product components
- `src/server/`: Express boot, SSR, proxy routes, cache hooks, and cron setup
- `src/store/`: Redux store creation and root reducer wiring
- `src/services/`, `src/helpers/`, `src/utils/`: API wrappers and shared logic
- `src/client/`: browser entry points for default, desktop, and China variants
- `src/routes/`: route configuration for shared and desktop builds
- `webpack/`, `jest/`, `scripts/`: build, test, and maintenance tooling

## Related pages

- [Overview](./Overview.md)
- [App Shell](./App-Shell.md)
- [Pages Catalog](./Pages-Catalog.md)
- [Shared Components](./Shared-Components.md)
- [State and Data](./State-and-Data.md)
- [Server and SSR](./Server-and-SSR.md)
- [Tooling and Workflows](./Tooling-and-Workflows.md)
- [Routes and Areas](./Routes-and-Areas.md)

## Evidence

- Code: src/
- Code: webpack/
- Code: jest/
- Code: scripts/
