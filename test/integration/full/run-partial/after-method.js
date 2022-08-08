describe('run-partial, after-method', function () {
  'use strict';
  var ruleName = 'heading-order';
  var runPartialRecursive = axe.testUtils.runPartialRecursive;
  var clone = axe.utils.clone;

  beforeEach(function (done) {
    axe.testUtils.awaitNestedLoad(done);
  });

  it('gives the same passed results as axe.run with a complex "after" method', function (done) {
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
        axeRunPartialResult.testEnvironment = axeRunResult.testEnvironment;
        axeRunPartialResult.timestamp = axeRunResult.timestamp;
        assert.deepEqual(axeRunPartialResult, axeRunResult);
        done();
      })
      .catch(done);
  });

  it('gives the same failed results as axe.run with a complex "after" method', function (done) {
    var options = { runOnly: ruleName };
    var context = { exclude: [['#frame1', '#frame1a']] };
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

        assert.isObject(axeRunPartialResult);
        assert.isObject(axeRunResult);
        // Check the node is the one we expect
        var nodes = axeRunPartialResult.violations[0].nodes;
        assert.lengthOf(nodes, 1);
        assert.deepEqual(nodes[0].target, ['#frame1', 'h3']);

        axeRunPartialResult.timestamp = axeRunResult.timestamp;
        assert.deepEqual(axeRunPartialResult, axeRunResult);
        done();
      })
      .catch(done);
  });
});
