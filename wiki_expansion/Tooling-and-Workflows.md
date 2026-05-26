# Tooling and Workflows

## Summary

The repo has a conventional but custom-managed toolchain built around Webpack, Babel, Jest, ESLint, Stylelint, Prettier, and Yarn scripts.

## Key facts

- Webpack configuration is split across base, client, server, and helper config files.
- Jest is already configured with `ts-jest` and `jsdom`.
- Development relies on Webpack builds plus `nodemon` rather than a framework dev server.
- The repo includes validation scripts for wrapper HOCs and Webpack config correctness.
- Generated output and static artifacts live under `public/` and `dist/`.

## Main tool folders

- `webpack/`: bundling for client, server, and asset publishing
- `jest/`: test runner config and mocks
- `scripts/`: verification and deployment helper scripts

## Core workflows

- `yarn dev` and `yarn dev-desktop` for local development
- `yarn build` for production bundles
- `yarn test` for unit tests
- `yarn lint` for code, type, style, and formatting checks

## Caveats

- `public/` contains generated hot-update files and other output, so repo navigation should focus on source directories first.
- The presence of both `package-lock.json` and `yarn.lock` is notable, but Yarn is the declared package manager.

## Evidence

- Code: package.json
- Code: webpack/
- Code: jest/
- Code: scripts/
- Code: public/

## Related pages

- [Codebase Map](./Codebase-Map.md)
- [Operations](./Operations.md)
- [Server and SSR](./Server-and-SSR.md)
