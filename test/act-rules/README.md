# ACT Rules

Each ACT rule that axe-core is consistent with has a test file in this directory named [after the ACT rule](https://github.com/act-rules/act-rules.github.io/tree/develop/_rules). These tests use the `act-runner.js` script, which loads the test cases from `node_modules/wcag-act-rules`. The ACT runner accepts a `id` and `title` from the ACT rule, and an array of `axeRules` that map to this ACT rule.

To run all tests, use `npm run test:act`. To test individual files, you can use Mocha's --grep argument: `npm run test:act -- --grep=afw4f7`.
