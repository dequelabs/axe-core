# axe-core — PR Checklist

Complete every item before opening a PR. Reviewers will not merge until all boxes are checked.

## Code

- [ ] Default export is at the top of the file, immediately after imports
- [ ] Return early pattern used — no nested conditionals where an early return works
- [ ] JSDoc comments on all functions (parameters, return type, `@memberof`)
- [ ] `console.log` replaced with `import log from '../../core/log'`
- [ ] No hardcoded ARIA/HTML lists — queried from `standards/` via `commons/standards`
- [ ] Imports follow directory restrictions — especially no `commons` from `core/utils`

## Tests

- [ ] Unit tests cover all code paths including `null`/`undefined` inputs
- [ ] Integration test HTML + JSON pair added/updated for any rule changes
- [ ] Shadow DOM test case added where relevant
- [ ] `npm test` passes locally

## Formatting & Build

- [ ] `npm run fmt` passes (Prettier)
- [ ] `npm run eslint` passes
- [ ] `npm run build` run — generated files (`axe.js`, `axe.min.js`, `locales/_template.json`) committed in the same commit as source changes

## Commits

- [ ] All commits follow Angular format: `<type>(<scope>): <subject>`
- [ ] Subject is imperative, lowercase, no trailing period, ≤100 chars total
- [ ] Commit body explains motivation (not just what changed)
- [ ] Footer includes issue reference: `Closes issue #123` or full URL
- [ ] Breaking changes documented in footer: `BREAKING CHANGE: description`

## Docs

- [ ] `doc/rule-descriptions.md` updated for new rules
- [ ] `doc/API.md` and `axe.d.ts` updated for API changes
- [ ] `locales/_template.json` updated if messages changed
- [ ] `CHANGELOG.md` updated with migration guide for breaking changes
