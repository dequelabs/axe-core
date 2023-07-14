/*global mocha */
const failedTests = [];
function flattenTitles(test) {
  const titles = [];
  while (test.parent.title) {
    titles.push(test.parent.title);
    test = test.parent;
  }
  return titles.reverse();
}

(function () {
  'use strict';

  var runner = mocha.run();
  runner.on('end', function () {
    window.mochaResults = runner.stats;
    window.mochaResults.reports = failedTests;
  });
  runner.on('fail', function logFailure(test, err) {
    failedTests.push({
      name: test.title,
      result: false,
      message: err.message,
      stack: err.stack,
      titles: flattenTitles(test)
    });
  });
})();
