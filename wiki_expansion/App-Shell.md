# App Shell

## Summary

The app shell owns cross-cutting concerns that sit above individual page modules, including app-wide state, middleware, environment-specific behavior, and shared layout concerns.

## Key facts

- `src/app/` is the main home for shell-level logic.
- The route tree is mounted through `App` components for shared and desktop entry points.
- App-wide reducers and middleware appear to coordinate banners, auth, localization, iframe handling, whitelabel behavior, and analytics-related concerns.
- Route config imports middleware from `@App/appReducer` and related app-level modules, which makes the shell the main composition layer for request-time behavior.

## Important subareas

- `src/app/components/`: app-wide wrappers and shell components
- `src/app/constants/`: shared shell constants
- `src/app/data/`: app-level data helpers and state support
- `src/app/assets/`: shell assets

## Why this area matters

- It defines behavior that affects many pages at once.
- It is the likely place to start when behavior changes by country, device class, or brand mode.
- It acts as the bridge between routing and page rendering.

## Evidence

- Code: src/app/
- Code: src/routes/index.ts
- Code: src/routes/desktop/index.ts

## Related pages

- [Codebase Map](./Codebase-Map.md)
- [Server and SSR](./Server-and-SSR.md)
- [State and Data](./State-and-Data.md)
