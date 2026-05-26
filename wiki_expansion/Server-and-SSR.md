# Server and SSR

## Summary

The backend side of the repo is an Express-based SSR server with support for static assets, request middleware, reverse proxies, caching hooks, and cron initialization.

## Key facts

- `src/server/index.ts` is the main server entry.
- SSR responsibilities are split into dedicated modules under `src/server/`.
- The server serves static assets from `public/`.
- It exposes helper endpoints for proxying requests and operational hooks such as cache invalidation and web vitals logging.
- Development behavior is supported through `src/server/devServer.ts`.

## Important subareas

- `ssr.tsx`: request rendering orchestration
- `renderHtml.ts`: HTML document assembly
- `renderErrorPage.ts`: error handling path
- `cacheMiddleware.ts` and `cacheInvalidationEndpoint.ts`: caching support
- `cronJobs.ts`: scheduled job bootstrapping
- `caheProvider/`: cache provider support, including dummy cache fallback

## Operational observations

- The server handles multiple runtime modes including whitelabel and China deployments.
- Proxy support suggests the frontend depends on upstream systems during runtime.
- The cache layer and cron setup deserve dedicated follow-up documentation.

## Evidence

- Code: src/server/index.ts
- Code: src/server/
- Code: public/

## Related pages

- [Codebase Map](./Codebase-Map.md)
- [Architecture](./Architecture.md)
- [Tooling and Workflows](./Tooling-and-Workflows.md)
