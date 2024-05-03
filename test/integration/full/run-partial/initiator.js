describe('run-partial, initiator', function () {
  'use strict';
  let ruleName = 'document-title';
  let runPartialRecursive = axe.testUtils.runPartialRecursive;
  let clone = axe.utils.clone;

  beforeEach(function (done) {
    axe.testUtils.awaitNestedLoad(done);
  });

  it('gives the same results as axe.run when context.initiator is used', function (done) {
    let options = { runOnly: ruleName };
    let context = { exclude: [] };
    Promise.all(runPartialRecursive(clone(context), options))
      .then(function (partialResults) {
        return Promise.all([
          axe.finishRun(partialResults, options),
          axe.run(clone(context), options)
        ]);
      })
      .then(function (results) {
        let axeRunPartialResult = results[0];
        let axeRunResult = results[1];
        assert.lengthOf(axeRunPartialResult.violations, 0);
        axeRunPartialResult.testEnvironment = axeRunResult.testEnvironment;
        axeRunPartialResult.timestamp = axeRunResult.timestamp;
        assert.deepEqual(axeRunPartialResult, axeRunResult);
        done();
      })
      .catch(done);
  });
});
