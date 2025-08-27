# ACT Rules

Each ACT rule that axe-core is consistent with has a test file in this directory named [after the ACT rule](https://github.com/act-rules/act-rules.github.io/tree/develop/_rules). These tests use the `act-runner.js` script, which loads the test cases from `node_modules/wcag-act-rules`. The ACT runner accepts a `id` and `title` from the ACT rule, and an array of `axeRules` that map to this ACT rule.

To run all tests, use `npm run test:act`. To test individual files, you can use Mocha's --grep argument: `npm run test:act -- --grep=afw4f7`.

The spec file object allows the following properties:

- `id` - (required) The `ruleId` of the ACT rule, found in the [testcases.json file](https://github.com/w3c/wcag-act-rules/blob/main/content-assets/wcag-act-rules/testcases.json).
- `title` - (required) The `ruleName` of the ACT rule, found in the [testcases.json file](https://github.com/w3c/wcag-act-rules/blob/main/content-assets/wcag-act-rules/testcases.json).
- `axeRules` - (required) A list of axe-core rule ids to run. A single ACT rule can require multiple axe-core rules in order to cover all the ACT examples (e.g. the ACT rule `button-non-empty` requires both `button-name` and `aria-command-name` to run).
- `skipTests` - (optional) A list of ACT `testcaseId` to skip. Please be sure to add a comment as to why the test should be skipped. If applicable, please open an issue in axe-core and link to the issue in the code so that we can track the issue and know when we can run the test again.
