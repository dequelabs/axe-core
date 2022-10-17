# Rule Integration Tests

Rule Integration tests take an HTML snippet file and runs an axe-core rule against it. The results for the run are then compared against the companion JSON file to ensure that every node returns as the expected result (passes, violation, incomplete, inapplicable).

To run the rule integration tests, run `npm run test:unit:integration`. You can run and debug the tests in a non-headless browser by running `npm run test:debug -- testDirs=integration`.

When the tests are run, each JSON file is converted into a test suite file using [Karmas preprocessor](https://karma-runner.github.io/latest/config/preprocessors.html) and [runner.js](./runner.js) as the test suite template.

The JSON file for a rule integration test contains the following information:

- `description` - string(required). The title of the test. Used in the `describe` block of the test suite
- `rule` - string(required) The axe-core rule to run
- `violations` array(optional). List of axe-core selectors of nodes that should return as Violations
- `passes` array(optional). List of axe-core selectors of nodes that should return as Passes
- `incomplete` array(optional). List of axe-core selectors of nodes that should return as Needs Review

The JSON file should have at least one of the `violations`, `passes`, or `incomplete` arrays. Inapplicable results are not listed as the test will fail if any node is found in one of the 3 arrays that is not explicitly listed.
