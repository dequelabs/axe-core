# axe-core — Claude Code Context

## Before You Start

- **Related work:** Search open PRs, issues and epics in the same area, and link what you find in the PR.
- **Agreement first:** Get a maintainer's agreement on the issue before writing a new rule (see `doc/rule-proposal.md`) or changing what a rule reports. Say in the PR who needs the change and why.
- **Design first:** Changes to selector output, the engine's execution model, or any output downstream tools consume need design agreement on an issue before any code. Don't pick these issues up without it.
- **Scope:** Stay inside the issue, one change per PR, and don't mix refactoring into feature work. File bugs you find outside it as new issues.
- **Public repo:** Leave internal product detail out of issues, commits and PRs.

## Before Specific Changes

- **Writing a new check or rule, or changing one?** Read `doc/examples/rule-check-templates.md` first.
- **Writing a new rule, or changing anything that can alter what axe reports as passed, failed or incomplete** (a rule, check, matcher or selector, `standards/` data, or a commons function such as roles, accessible names or visibility), **or a rule's impact or WCAG mapping?** Read `doc/examples/accessibility-decisions.md` first.
- **Renaming, removing or re-signing an export in `lib/commons/` or `lib/core/utils/`** (public as `axe.commons` and `axe.utils`), **or changing anything else on `axe`, its options, result fields, selector output, rule IDs, tags, defaults, the standards object, `axe.d.ts` or a supported platform?** Read `doc/examples/output-stability.md` first.
- **Fixing a bug or false positive, removing a guard or intentional error, or making a perf change?** Read the Pull Request section of `doc/pull-request-checklist.md` before you start.
- **Opening a PR?** Fill in the PR template and work through `doc/pull-request-checklist.md`.

## 0. Fundamental Standards

- **Package manager:** pnpm only, pinned via `packageManager` in `package.json`. Never use Corepack; it is deprecated and removed in Node 25+.
- **Formatting:** Run `pnpm run fmt` (Prettier) and `pnpm run eslint` before every commit.
- **Testing:** 100% coverage goal. Run `pnpm test` before completion. Behavior-changing PRs need unit and integration tests where applicable; see `doc/code-submission-guidelines.md` for exceptions.
- **Commits:** Angular commit convention is mandatory, and non-conforming commits are rejected (§3).
- **Issues:** Tracked in [GitHub Issues](https://github.com/dequelabs/axe-core/issues).

## 1. Technical Guidelines

### Code Structure

- **Return Early:** Keep the happy path left-aligned. Handle errors and edge cases first with early returns, and use `continue` in loops.
- **Reuse:** Search `lib/` for an existing helper before writing one. See `doc/examples/reuse-map.md`.
- **Standards data:** Never hardcode ARIA/HTML lists. Query `standards/` through `commons/standards`.
- **Exports:** Default export at the top of the file, right after imports.
- **JSDoc:** Document exported APIs and complex logic, with `@param` and `@return` names and types matching the signature. See `doc/code-submission-guidelines.md`.
- **Comments:** Explain why non-obvious code exists, such as a cached getter.
- **Naming:** Files and rule/check IDs in kebab-case. Functions in camelCase. Booleans prefixed `is`/`has`/`should`. Constants in `UPPER_SNAKE_CASE`.
- **Variables:** Declare at point of use.

### Virtual Nodes vs. HTMLElement

- **Prefer Virtual Nodes** for attribute and property reads (`virtualNode.attr()`, `virtualNode.props`). Use the real DOM only for DOM APIs such as `getBoundingClientRect`.
- **`core/utils/`:** New code there must not read Virtual Node properties (ESLint flags `vNode.` and `virtualNode.`). Utilities that need the Virtual Tree go in `commons/`. Older exceptions predate the rule: `lib/core/utils/matches.js`, tree lookups such as `nodeLookup()`, and the files ignored in the Virtual Tree block of `eslint.config.js`.
- **Conversion:** Use `nodeLookup()` for an input that may be a `VirtualNode` or a DOM `Node`. It returns `{ vNode, domNode }`, and `vNode` is `null` or `undefined` outside the Virtual Tree.
- **Restricted DOM APIs:** Use `nodeName`, not `tagName`. Read attributes with `vNode.attr()`, `vNode.hasAttr()` or `vNode.attrNames`, not `node.attributes`; with no Virtual Node, as in `core/utils`, use the deprecated `getNodeAttributes()`. Use `contains(vNode, otherVNode)` from `core/utils`, not `node.contains()`, which fails across shadow DOM. Read roles with `getExplicitRole()` or `getRole()`, not the raw `role` attribute. ESLint catches only some of these.

### Import Restrictions (Hard Rules)

- `standards/` → nothing (pure data).
- `core/utils/` → other `core/utils`, `core/base`, `core/log.js`, `standards` via **direct file paths only** (no index).
- `core/imports/` → node modules **only** (the only place npm imports are allowed).
- `commons/` → other `commons` (direct paths), `core/utils` (index OK), `core/log.js`.
- `checks/` and `rules/` → any directory (index OK).
- **Never** import `commons` from `core/utils`. This is the most commonly rejected violation. Details: `eslint.config.js`.

### Runtime Rules

- **ES5:** Output is ES5 and still runs in IE11 (deprecated). Feature-detect newer globals through `window` (`window.Intl`).
- **Environments:** axe runs in the page and in extension isolated worlds. Don't rely on page globals or the page's custom element registry.
- **Author code:** Don't call page getters or other author code while reading state, and don't assume the DOM came from the HTML parser.
- **Partial trees:** A guard for a partial tree, such as a subtree passed to `axe.setup()`, never defaults to a state that skips checks. If the root can't be reached, don't assume the element is hidden.
- **Nodes outside the Virtual Tree:** Helpers can receive one, such as from a closed shadow root. Log a fixed message with `log()` (`lib/core/log.js`), without the node or its content, and return an empty result rather than throwing.
- **Untrusted input:** Frame messages are untrusted. The default messenger's `message-handler.js` checks origin, sending window and that the message ID is new, `parseMessage` checks only the envelope, and a custom `axe.frameMessenger()` skips both. So each message topic and reply handler validates its own payload. Don't add guards for states axe never sees, such as detached nodes.
- **Loops and size:** Hoist invariant work out of loops, and split oversized files.

### Where the Fix Lives

Before patching a rule, find the layer that owns the behavior: `standards/` data, a commons function, a shared util or a dependency version. Fix it there, prefer the general mechanism over a per-element special case, and say in the PR why the fix lives there. The owning layer can be outside axe-core, such as a reporter for a new output format, or the calling tool for a speedup only one consumer needs.

### High-Risk Areas (Extra Scrutiny Required)

- **Color contrast:** Handles all CSS color formats, opacity, blend modes, stacking contexts and text-shadow. Return `undefined` when the background can't be determined. See `doc/developer-guide.md`.
- **ARIA validation:** Must stay current with the spec. Query roles and attributes from `standards/aria-roles.js` and `standards/aria-attrs.js`, and handle implicit vs. explicit roles. See `doc/rule-development.md`.
- **Hidden elements:** Use `isVisibleToScreenReaders()`, not CSS visibility alone. Account for `aria-hidden="true"` and Shadow DOM boundaries.
- **i18n:** Update `locales/_template.json` on every message change (`pnpm run build` regenerates it) and commit it in the same commit as the source, never separately.

## 2. Testing

- **Structure:** Mirror `lib/` under `test/` (`lib/commons/text/sanitize.js` → `test/commons/text/sanitize.js`).
- **Checks:** Use `axe.testUtils.MockCheckContext()` and reset only it in `afterEach`. The harness clears `fixture` and `axe._tree`, so don't clear or re-test them.
- **Where tests go:** A function's own branches get a unit test. Rule behavior, or anything driven by `standards/` data, gets an HTML + JSON pair in `test/integration/rules/<rule-name>/` (selectors as `["#id"]`, iframes `["iframe", "#id"]`), or an HTML page and `.js` test in `test/integration/full/<rule-name>/`. A rule that must work without a DOM also gets a test in `test/integration/virtual-rules/`.
- **Metadata-only changes:** A change such as a tag needs no new test, but a tag or default-enablement change updates `test/integration/full/all-rules/`, `test/integration/full/isolated-env/` and `test/aria-practices/` as needed. Invariants across metadata belong in `build/validate-files.mjs`.
- **What to cover:** Every new `this.data()` shape and message key gets a test, without asserting the message text. A bug you believe is already fixed gets a test that proves it. Test inputs and outputs, not internal caching or memoization.
- **Edge cases:** Run the edge-case list in `doc/pull-request-checklist.md` for every changed check or matcher.
- **Shadow DOM:** Add a Shadow DOM test only when the result depends on something across a shadow boundary (something on or above the host, slotted content, idrefs across roots). Use declarative Shadow DOM, as in `doc/examples/test-patterns.md`.
- **Logging:** Don't commit `console.log` statements.

## 3. Build & Commits

- **Bundles** (`axe.js`, `axe.min.js`) are generated for releases and gitignored.
- **Commit format:** `<type>(<scope>): <subject>`, imperative, lowercase, no period, ≤100 chars total. The body explains motivation. Footer: `Closes: #123` or a full URL, one `Closes:` line per issue. Example: `fix(aria-valid-attr-value): handle multiple aria-errormessage IDs`. See `doc/code-submission-guidelines.md` for the type list.

## 4. Reference

- **Examples and rules:** `doc/examples/code-patterns.md`, `doc/examples/test-patterns.md`, `doc/examples/rule-check-templates.md`, `doc/examples/accessibility-decisions.md`, `doc/examples/output-stability.md`, `doc/examples/pr-review-patterns.md`, `doc/examples/reuse-map.md`
- **Docs:** `CONTRIBUTING.md`, `doc/code-submission-guidelines.md`, `doc/developer-guide.md`, `doc/rule-development.md`, `doc/API.md`, `doc/pull-request-checklist.md`
- **Help:** [axe-community Slack](https://accessibility.deque.com/axe-community), [GitHub Issues](https://github.com/dequelabs/axe-core/issues)
