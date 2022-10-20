# Full Integration Tests

Full Integration tests are tests that require a complete HTML page rather than testing content inside of a fixture element. Full integration tests are run using a non-headless browser and requires a page navigation to the relevant HTML test file.

To run the full integration tests, run `npm run test:integration`. Different browsers can be used using various npm scripts:

- `npm run test:integration:chrome` - Run the tests using Chrome (default when using `test:integration`)
- `npm run test:integration:firefox` - Run the tests using Firefox
- `npm run test:integration:ie` - Run the tests using Internet Explorer (requires running on Windows machine)

Because the full integration tests are not run using Mocha, Mocha styles and scripts, Chai, axe-core, [testutils.js](../../tesstutils.js), and the [adapter.js](../adapter.js) file will need to be loaded on the page.

If the Mocha output would interfere with the axe-core results, you can load the [no-ui-reporter.js](../no-ui-reporter.js) to hide the Mocha test output in the browser UI and instead report the results in the browsers devtools console.
