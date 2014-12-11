# Selenium README #

This example demonstrates how to use Kensington Automated Testing with the
Selenium browser automation tool and Node development tools.  This example will generate XML that can
be utilized by Jenkins to control build success or failure.

Selenium integration enables testing of full pages and sites.

## To configure the example ##

* Node must be installed; please follow the directions at http://www.nodejs.org
  to install it.
* Firefox must be installed; please follow the directions at http://getfirefox.com
  to install it. On Unix, ensure that Firefox is on your path.
* `npm install -g grunt-cli` to install the Grunt task runner (may need to be
  run with `sudo` on Unix or as Administrator on Windows)
* Move to the `doc/examples/selenium-jenkins` directory
* `npm install` to install dependencies

## To run the example ##

* Move to the `doc/examples/selenium-jenkins` directory
* `grunt test` to run Selenium

This should launch an automated Firefox window, load and analyze the
configured web pages, and then output Kensington Automated Test results to XML
files, one per URL.

## To configure the example to run in Jenkins ##

* Log into Jenkins - ensure you have Administrator privileges
* Click 'Manage Jenkins'
* Click 'Manage Plugins'
* Browse the 'Available' tab and install the NodeJS plugin.
* Click 'New Item'
* Enter a build name and pick 'Build a free-style-software project'
* Click 'OK'
* Setup the appropriate SCM software
* Under 'Build Environment', check 'Start Xvfb before the build and shut it down after'
* Add a 'Build Step' and pick 'Execute NodeJS script
* Add a line to change the current directory to the path mentioned in the previous section.
* Add a line 'grunt test'
* Add another 'Build Step' and pick 'Process xUnit test result report'
* Set any desired thresholds.
* Click 'Save'
* You can now run the build.

## To modify the example ##

To run the example on your own web pages, edit Gruntfile.js. The `urls`
property of the ks-selenium task controls which URLs the example will run on,
so simply edit that property to put in the URLs you wish to test. 

The example is simply logging the analysis results to files.  The Kensington
Automated Testing documentation should be consulted for more details on
customizing and analyzing calls to `dqre.a11yCheck`.

