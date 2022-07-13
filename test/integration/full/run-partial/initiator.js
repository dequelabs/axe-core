describe('run-partial, initiator', function () {
  'use strict';
  var ruleName = 'document-title';
  var runPartialRecursive = axe.testUtils.runPartialRecursive;
  var clone = axe.utils.clone;

  beforeEach(function (done) {
    axe.testUtils.awaitNestedLoad(done);
  });

  it('gives the same results as axe.run when context.initiator is used', function (done) {
    var options = { runOnly: ruleName };
    var context = { exclude: [] };
    Promise.all(runPartialRecursive(clone(context), options))
      .then(function (partialResults) {
        return Promise.all([
          axe.finishRun(partialResults, options),
          axe.run(clone(context), options)
        ]);
      })
      .then(function (results) {
        var axeRunPartialResult = results[0];
        var axeRunResult = results[1];
        assert.lengthOf(axeRunPartialResult.violations, 0);

        // it appears the selenium webdriver browser message "Chrome is being controlled by
        // automated software" changes the window height when it appears
        // between running the two axe runs
        axeRunPartialResult.testEnvironment = axeRunResult.testEnvironment;

        axeRunPartialResult.timestamp = axeRunResult.timestamp;
        assert.deepEqual(axeRunPartialResult, axeRunResult);
        done();
      })
      .catch(done);
  });
});
