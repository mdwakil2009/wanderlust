<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## Stack facts that differ from defaults

- Next.js **16.4.3** + React 19.3. Next 16 specifics in this codebase:
  - Route prop types are generated globals — layouts/pages type props as `LayoutProps<"/">` etc. (see `src/app/layout.tsx`); don't hand-write prop interfaces for route segments.
  - `next.config.ts` enables `cacheComponents` and `partialPrefetching` — default caching/dynamic-rendering semantics differ from older Next; respect the cache-components model for data fetching.
  - React Compiler is on (`reactCompiler: true`, `babel-plugin-react-compiler` in deps) — components must stay pure: no side effects or mutable state during render.
- npm project (`package-lock.json`); do not introduce pnpm/yarn lockfiles.

## Commands

- `npm run dev`, `npm run build`, `npm run lint` (lint is a bare `eslint` against the flat config `eslint.config.mjs`).
- No test or typecheck scripts exist; use `npx tsc --noEmit` to typecheck. There are no CI workflows.

## UI components

- shadcn is configured with style **base-nova** (`components.json`): primitives come from **`@base-ui/react`, not Radix**. Add components with `npx shadcn add <name>` into `src/components/ui/`.
- `cn` is the `cn` npm package, re-exported from `src/lib/utils.ts` — don't recreate a local clsx/tailwind-merge helper.

## Tailwind v4 (CSS-first)

- No tailwind config file: theme tokens live in `src/app/globals.css` under `@theme inline`; shadcn theme via `@import "shadcn/tailwind.css"`; dark mode is the `.dark` class (`@custom-variant`).
- CSS compiles through the `@tailwindcss/turbopack` loader rule in `next.config.ts` — dev/build are expected to run on Turbopack.

## Layout

- Path alias `@/*` → `src/*`. App Router entrypoints in `src/app/`, components in `src/components/`, helpers in `src/lib/`. Single package, no workspaces.
