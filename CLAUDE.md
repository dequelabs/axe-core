# axe-core — Claude Code Context

**Last updated:** 2026-03-19

## 0. Fundamental Standards

- **Formatting:** Run `npm run fmt` (Prettier) and `npm run eslint` before every commit. No exceptions.
- **Zero-Exception Testing:** 100% coverage goal. Run `npm test` before completion. All code changes require unit + integration tests.
- **Import Rule:** Directory-level import restrictions are strictly enforced. See `doc/import-rules.md`.
- **Commits:** Angular commit convention is mandatory. PRs with non-conforming commits will be rejected. See `doc/code-submission-guidelines.md`.
- **Issues:** All unresolved issues tracked in [GitHub Issues](https://github.com/dequelabs/axe-core/issues).

## 1. Technical Guidelines

### Code Structure

- **Return Early:** Keep the happy path left-aligned. Handle errors/edge cases first with early returns — never nest when you can exit.
- **Exports:** Default export at the top of the file, immediately after imports.
- **JSDoc:** Every function requires JSDoc. Document parameters, return type, and `@memberof`. See `doc/developer-guide.md`.
- **Naming:** Files and rule/check IDs in kebab-case. Functions in camelCase. Booleans prefixed `is`/`has`/`should`. Constants in `UPPER_SNAKE_CASE`.
- **Variables:** Declare at point of use, not at the top of the function.

### Virtual Nodes vs. HTMLElement

- **Prefer Virtual Nodes** for attribute access and property reads (`virtualNode.attr()`, `virtualNode.props`).
- **Use real DOM** only when you need DOM APIs (e.g., `getBoundingClientRect`, `getRootNode`).
- **`core/utils/` functions** must NOT use Virtual Nodes — they run before Virtual Tree is initialized.
- **Conversion:** Use `getNodeFromTree()` from `core/utils` when you receive an ambiguous input.

### Import Restrictions (Hard Rules)

- `standards/` → nothing (pure data, no imports).
- `core/utils/` → other `core/utils`, `core/base`, `standards` via **direct file paths only** (no index).
- `core/imports/` → node modules **only** (the only place npm imports are allowed).
- `commons/` → other `commons` (direct paths), `core/utils` (index OK).
- `checks/` and `rules/` → any directory (index OK).
- **Never** import `commons` from `core/utils`. This is the most commonly rejected violation.

### Checks & Rules

- **Check evaluate functions:** Return `true` (pass), `false` (fail), or `undefined` (incomplete). Use `this.data()` to pass values to message templates and to provide incomplete-result detail.
- **Rule JSON:** Use `all`, `any`, `none` check arrays. `selector` + optional `matches` to scope candidates. Valid `impact` values: `"minor"`, `"moderate"`, `"serious"`, `"critical"`.
- **Standards data:** Never hardcode ARIA/HTML lists in checks. Query from `standards/` via `commons/standards` functions.
- **Messages:** All user-facing strings live in check/rule JSON `metadata.messages`. Use `${data.property}` templates. Support singular/plural variants. Update `locales/_template.json` whenever messages change (auto-synced on `npm run build`).

### High-Risk Areas (Extra Scrutiny Required)

- **Color contrast:** Handles all CSS color formats, opacity, blend modes, stacking contexts, text-shadow. Return `undefined` when background cannot be determined. See `doc/developer-guide.md`.
- **ARIA validation:** Must stay current with spec. Query roles/attrs from `standards/aria-roles.js` and `standards/aria-attrs.js`. Handle implicit vs. explicit roles. See `doc/rule-development.md`.
- **Hidden elements:** Use `isVisibleToScreenReaders()`, not CSS visibility alone. Account for `aria-hidden="true"` and Shadow DOM boundaries.
- **i18n:** Update `locales/_template.json` on every message change and commit the generated file alongside source.

## 2. Testing

- **Structure:** Mirror `lib/` exactly under `test/`. File `lib/commons/text/sanitize.js` → `test/commons/text/sanitize.js`.
- **Checks:** Use `axe.testUtils.MockCheckContext()`. Reset `fixture`, `checkContext`, and `axe._tree` in `afterEach`.
- **Integration tests:** All rule changes require an HTML + JSON pair in `test/integration/rules/<rule-name>/`. JSON selectors must use axe array format (`["#id"]`; iframes: `["iframe", "#id"]`).
- **Shadow DOM:** Every relevant check/rule must include an open Shadow DOM test case. Skip gracefully with `this.skip()` if `axe.testUtils.shadowSupport.v1` is false.
- **Logging:** Import the logging helper from `lib/core/log.js` (using a path relative to the current file). Never use `console.log`.

## 3. Build & Commits

- **Build outputs** (`axe.js`, `axe.min.js`, `locales/_template.json`) are auto-generated. Always commit them in the same commit as their source changes — never in a separate commit.
- **One change per PR.** Do not mix refactoring with feature work.
- **Commit format:** `<type>(<scope>): <subject>` — imperative, lowercase, no period, ≤100 chars total. Body explains motivation. Footer: `Closes issue #123` or full URL. See `doc/code-submission-guidelines.md` for the full type list.

**Example:**

```
fix(aria-valid-attr-value): handle multiple aria-errormessage IDs

When aria-errormessage contains multiple space-separated IDs, verify
all IDs exist in aria-describedby instead of matching the full string.

Closes issue #4957
```

## 4. Documentation & API Changes

- **New rules:** Update `doc/rule-descriptions.md` and `CHANGELOG.md`.
- **API changes:** Update `doc/API.md` and `axe.d.ts` TypeScript definitions.
- **Breaking changes:** Add `BREAKING CHANGE: description` to commit footer. Include migration guide in `CHANGELOG.md`. Tag deprecated code with `@deprecated` JSDoc.

## 5. Examples (Copy-Paste Reference)

- **Code patterns:** `doc/examples/code-patterns.md` — return early, default export, imports, JSDoc, Virtual Node usage
- **Test patterns:** `doc/examples/test-patterns.md` — unit tests, check tests, Shadow DOM tests, integration test HTML+JSON
- **Rule & check templates:** `doc/examples/rule-check-templates.md` — JSON templates for rules and checks, evaluate function pattern
- **PR review patterns:** `doc/examples/pr-review-patterns.md` — common reviewer feedback, anti-patterns, what reviewers look for

## 6. Reference Docs & Help

- **Contributing guide:** `CONTRIBUTING.md`
- **Import rules detail:** `doc/import-rules.md`
- **Code submission standards:** `doc/code-submission-guidelines.md`
- **Developer guide:** `doc/developer-guide.md`
- **Rule development:** `doc/rule-development.md`
- **API reference:** `doc/API.md`
- **Pull Request Checklist:** `doc/pull-request-checklist.md`
- **Slack:** [axe-community](https://accessibility.deque.com/axe-community)
- **Issues:** [GitHub Issues](https://github.com/dequelabs/axe-core/issues)
