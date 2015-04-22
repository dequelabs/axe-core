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

To run the example on your own web pages, change the URL passed to `driver.get` in the `testAccessibility` method of the `KensingtonTest` class.

There are three methods defined in the `TestHelper` class:
* `inject` will inject the required script into the page under test and any iframes.  This only needs to be run against a given page once.
* `analyze` will run analysis and return the result structure as a `JSONObject`
* `report` will pretty-print a list of violations.

The Kensington Automated Testing documentation should be consulted for more
details on customizing and analyzing calls to `dqre.a11yCheck`.

