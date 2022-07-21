# ACT Mapping

Contains information on how to run axe-core rules against the [ACT-Rules](https://act-rules.github.io/). Each ACT rule suite is its own JSON file (named after the axe-core rule to run) which contains the following information:

- `id` - string(required). The ACT Rule Id
- `title` - string(required). The title of the test. Used in the `describe` block of the test suite
- `axeRules` - array(required). List of axe-core rules to run

When the tests are run using `npm run test:act`, each JSON file is converted into a test suite file using [Karmas preprocessor](https://karma-runner.github.io/0.10/config/preprocessors.html) and [runner.js](./runner.js) as the test suite template. 

You can run and debug the tests in a non-headless browser by running `npm run test:act:debug`.