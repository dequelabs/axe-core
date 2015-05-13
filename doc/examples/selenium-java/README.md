# Selenium Java README #

This example demonstrates how to use Kensington Automated Testing with the
Selenium browser automation tool and Java development tools.

Selenium integration enables testing of full pages and sites.

## To configure the example ##

* Firefox must be installed; follow the directions at http://getfirefox.com to
  install it.  On Unix, ensure that Firefox is on your path.
* The Java SE Development Kit must be installed; follow the directions at
  http://www.oracle.com/technetwork/java/javase/downloads/index.html to install
  it.
* Maven must be installed; follow the directions at http://maven.apache.org/ to
  install it. Ensure that it is on your path.

## To run the example ##

* Move to the `selenium-java` directory
* `mvn test` to build and run the jUnit tests that drive Selenium.

This should launch an automated Firefox window, load and analyze the
configured web pages, and then pass/fail a jUnit test depending on whether
there are any accessibility violations detected.

## To modify the example ##

To run the example tests on your own web page, change the URL passed to
`driver.get` in `KensingtonTest.setUp()`.

`TestHelper` defines three public methods and a nested `Builder` class for your
unit tests.

* `inject` will inject the required script into the page under test and any
iframes.  This only needs to be run against a given page once, and `Builder`
will take care of it for you if you use that.
* `report` will pretty-print a list of violations.
* `writeResults` will write the JSON violations list out to a file with the
specified name in the current working directory.

The `Builder` class allows tests to chain configuration and analyze pages. The
constructor takes in a `WebDriver` that has already navigated to the page under
test; from there, you can set `options()`, `include()` and `exclude()`
selectors, and finally, `analyze()` the page.

* `options` wires a JSON string to Kensington, allowing rules to be toggled on
or off. See the `testAccessibilityWithOptions` unit test for an example.
* `include` adds to the list of included selectors. If you do not call
`include` at all, Kensington will run against the entire document.
* `exclude` adds to the list of excluded selectors. Exclusions allow you to
focus scope exactly where you need it, ignoring child elements you don't want
to test.
* `analyze` executes Kensington with any configuration you have previously
defined. If you want to test a single `WebElement`, you may pass it into
`analyze` instead of using `include` and `exclude`.

The Kensington Automated Testing documentation should be consulted for more
details on customizing and analyzing calls to `dqre.a11yCheck`.

