# PR Review Patterns

Common feedback and anti-patterns observed in axe-core code reviews.

## What Gets Called Out

### 1. Missing Tests

- Every behavior-changing code change needs unit tests
- Rule changes need integration tests (HTML + JSON pair)
- Shadow DOM test coverage required for relevant checks/rules

### 2. Commit Message Format

- Wrong type/scope
- Not imperative present tense
- Subject too long or capitalized
- Missing issue reference in footer

### 3. Import Violations

- `core/utils` importing from `commons` (forbidden)
- Using index imports where direct file paths are required
- Importing node modules outside `core/imports`

### 4. Code Style Issues

- Not using return early pattern
- Default export not at top of file
- Nested conditionals when early return would work
- Missing JSDoc comments

### 5. Performance Concerns

- Unnecessary DOM queries in loops
- Not caching Virtual Node properties
- Computing same value repeatedly instead of storing it

### 6. Incomplete Results

- Not returning `undefined` when a check can't determine the result
- Missing `incomplete` message variants in check JSON
- Not setting appropriate `this.data()` for incomplete cases

### 7. Accessibility Edge Cases

- Not considering all ARIA states
- Missing edge cases for hidden elements
- Not handling Shadow DOM properly

## What Reviewers Love

1. Comprehensive test coverage including edge cases
2. Clear, detailed commit messages with motivation
3. JSDoc comments that explain "why" not just "what"
4. Performance-conscious code that caches appropriately
5. Following existing patterns in similar files
6. Integration tests that cover both pass and fail cases

## Common PR Mistakes

1. Not running `npm test` locally before pushing
2. Not committing auto-generated `locales/_template.json` in the same commit as message source changes
3. Changing multiple unrelated things in one PR — split refactoring from feature work
4. Not updating integration tests when changing rule behavior
5. `console.log` statements should not be committed
6. Not handling `null` or `undefined` gracefully
7. Hardcoding strings that should come from `standards/` data
8. Changing public APIs without `BREAKING CHANGE` in commit footer
