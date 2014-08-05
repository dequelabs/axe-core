# Selenium Java README #

This example demonstrates how to use Kensington Automated Testing with the
Selenium browser automation tool and Java development tools. 

Selenium integration enables testing of full pages and sites.

## To configure the example ##

* Firefox must be installed; follow the directions at http://getfirefox.com to
  install it.
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

To run the example on your own web pages, change the method used to get URLs
(this is currently the `getUrl()` method of the `TestHelper` class). 

The example is simply printing the count of violations if any are detected.
The Kensington Automated Testing documentation should be consulted for more
details on customizing and analyzing calls to `dqre.a11ycheck`.

