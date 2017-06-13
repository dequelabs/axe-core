# Jest + React README #

This example demonstrates how to use aXe to test React components using the 
Jest unit testing framework.

The unit test is in `link.test.js`, and has one test cases, showing how to run
axe-core in Jest (using JSDOM and Enzyme).

## To configure the example ##

* Node must be installed; please follow the directions at http://www.nodejs.org
  to install it.
* Move to the `doc/examples/jest+react` directory
* `npm install` to install dependencies

## To run the example ##

* Move to the `doc/examples/jest+react` directory
* `npm test` to run Jasmine

You should see output indicating that the tests ran successfully, with zero
failures.

## To modify the example ##

This example can be modified to test components in other test frameworks as well. To use axe-core with JSDOM (Like Jest does), you will need to ensure that JSDOM variables are made available on the global object. An easy way to do this is to use [jsdom-global](https://github.com/rstacruz/jsdom-global).

For example, when running Mocha, you should require `jsdom-global/register`. The command for this is as follows:

```shell
mocha *.test.js --require jsdom-global/register
```

## Timeout Issues ##

Axe-core is very fast for what it does, but when testing larger components, it may take a few seconds to complete. This is because axe will be running thousands of tests in a single call. When testing composite components, you may have to increase the timeout setting.
