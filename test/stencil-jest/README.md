# Stencil + Jest + axe-core Debugging Test

Standalone diagnostic test that runs axe-core inside Stencil's Jest environment
(`newSpecPage`) to discover what breaks and why.

## Setup

```bash
cd test/stencil-jest
npm install
```

## Run

```bash
npm test
```

For verbose output:

```bash
npm run test:verbose
```

## What it tests

1. **Environment capabilities** — probes which DOM APIs exist in Stencil's mock DOM
2. **Shadow component on page.doc** — runs axe-core on documentElement with shadow DOM component
3. **Shadow component on page.body** — same but targeting body (tests context resolution)
4. **Scoped component** — shadow: false component for comparison (no shadow DOM)
5. **Nested components with slots** — cross-shadow-boundary traversal
6. **Structure-only rules** — disables layout-dependent rules to isolate structural analysis

## Debug output

The test includes extensive instrumentation that logs:

- DOM API availability (getComputedStyle, getBoundingClientRect, etc.)
- Virtual tree structure (node names, shadow IDs, child counts)
- Layout API return values (all-zeros detection)
- axe-core results breakdown (violations, passes, incomplete with reasons)
- Monkey-patched axe-core internals (getFlattenedTree, isShadowRoot calls)
