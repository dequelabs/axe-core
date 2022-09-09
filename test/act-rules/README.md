# ACT Rules

Each ACT rule that axe-core is consistent with has a test file in this directory. These tests use the `act-runner.js` script, which loads the test cases from `node_modules/wcag-act-rules`. The ACT runner accepts a `id` and `title` from the ACT rule, and an array of `axeRules` that map to this ACT rule.

To run all tests, use `npm run test:act`. This starts both the local server, and the test runner. To test individual files, you'll need to run the local server in a separate process (`npm start`), and call `npm run integration:act`. This can use the mocha `--grep` flag to filter. For example: `npm run integration:act --grep="afw4f7"`.
