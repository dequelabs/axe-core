# PhantomJS README #

This example demonstrates how to use Kensington Automated Testing with PhantomJS.

## To configure the example ##

* PhantomJS must be installed; please follow the directions at http://phantomjs.org/
  to install it.

## To run the example ##

* Move to the `doc/examples/phantomjs` directory
* `phantomjs kensington.js http://www.deque.com` to run Kensington in PhantomJS
  against http://www.deque.com and output results to the terminal
* `phantomjs kensington.js http://www.deque.com results.json` to run Kensington in PhantomJS
  against http://www.deque.com and save results to `results.json`