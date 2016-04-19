# Selenium README #

This example demonstrates how to use aXe with the Selenium browser automation
tool and Node development tools.

Selenium integration enables testing of full pages and sites.

## To configure the example ##

* Node must be installed; please follow the directions at http://www.nodejs.org
  to install it.
* Firefox must be installed; please follow the directions at http://getfirefox.com
  to install it. On Unix, ensure that Firefox is on your path.
* `npm install -g grunt-cli` to install the Grunt task runner (may need to be
  run with `sudo` on Unix or as Administrator on Windows)
* Move to the `doc/examples/selenium` directory
* `npm install` to install dependencies

## To run the example ##

* Move to the `doc/examples/selenium` directory
* `grunt test` to run Selenium

This should launch an automated Firefox window, load and analyze the
configured web pages, and then output aXe test results to JSON
files, one per URL.

## To modify the example ##

To run the example on your own web pages, edit Gruntfile.js. The `urls`
property of the ks-selenium task controls which URLs the example will run on,
so simply edit that property to put in the URLs you wish to test.

The example is simply logging the analysis results to files.  The aXe
documentation should be consulted for more details on customizing and
analyzing calls to `axe.run`.
