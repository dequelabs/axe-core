# PR Review Patterns

What maintainers ask for most often in axe-core reviews, with examples. The rules behind each theme are in `AGENTS.md` and the docs it points to.

## Why PRs Get Closed

- **Duplicates in-flight work or is superseded by a general fix.** Search open PRs and issues first, and fix the layer that owns the behavior. A fix that special-cases one element is often replaced by a general fix. Other closed PRs repeated work already open, or patched parsing that a dependency upgrade had already fixed.
- **No shown need or benefit.** Say who needs the change and back every claim with numbers or a repro. Closed examples include a 7ms saving for a lot of extra code, a change whose only reason was an open issue, and an intentional error removed with no repro.
- **New rule without agreement.** A new rule proposed before a maintainer agreed to it on an issue.

## What Gets Called Out

### Accessibility Semantics

Spec values, browser and AT behavior, and what should pass, fail or be incomplete. Common mistakes are wrong WAI-ARIA default values and guessed AT behavior. See [Accessibility Decisions](./accessibility-decisions.md).

### Root Cause

The fix patches a symptom in one rule when the behavior belongs in `standards/`, a commons function, a shared util or a dependency.

### Edge Cases

Counter-example markup the code gets wrong: descendant text, a stylesheet overriding an inline style, and `unset`. Run the edge-case list in the [PR checklist](../pull-request-checklist.md).

### Tests

Missing cases, such as no integration fixture for a rule's new fail and incomplete outcomes. Unneeded tests, such as a shadow DOM test that crosses no boundary, or tests of internal caching rather than inputs and outputs. See [test patterns](./test-patterns.md).

### Unproven Benefit

A perf or robustness claim that isn't shown (see [Why PRs Get Closed](#why-prs-get-closed) and the [PR checklist](../pull-request-checklist.md#pull-request)). Measure the built bundle with `perf/report.js` and `perf/compare.js`.

### Code Structure and Performance

Nesting where an early return or `continue` works, invariant work inside loops, oversized files.

### Imports

`core/utils` importing from `commons`, index imports where `core/utils` or `commons` needs direct file paths, and node modules imported outside `core/imports`. See [Import Restrictions](../../AGENTS.md#import-restrictions-hard-rules) in `AGENTS.md`, which `eslint.config.js` enforces in part.

### Reuse

Reimplementing a helper the codebase already has, such as copying a rule's selection logic instead of calling `rule.gather()`. See the [reuse map](./reuse-map.md).

### Public API and Runtime

Wrong types, back-compat, ES5 and IE11 output (a bare `Intl`, which throws in IE11), and extension isolated worlds. See [Back-Compat and Output Stability](./output-stability.md).

### Docs and Messages

JSDoc that doesn't match the signature, a new public field missing from the docs, and remediation text that is too long.

### Scope

A PR that mixes changes, or fixes a related bug outside its issue, gets asked to split.

## Common PR Mistakes

1. Not running `pnpm test` locally before pushing
2. Not committing auto-generated `locales/_template.json` in the same commit as message source changes
3. Not updating integration tests when changing rule behavior
4. Committing `console.log` statements
5. Hardcoding lists that should come from `standards/` data
6. Breaking a public function instead of keeping a deprecated wrapper (see [output stability](./output-stability.md))
