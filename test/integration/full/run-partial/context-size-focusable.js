describe('run-partial, context-size-focusable', function () {
  'use strict';
  var ruleName = 'frame-focusable-content';
  var runPartialRecursive = axe.testUtils.runPartialRecursive;
  var clone = axe.utils.clone;

  beforeEach(function (done) {
    axe.testUtils.awaitNestedLoad(done);
  });

  it('gives the same passed results as axe.run when context.size and context.focusable are used', function (done) {
    var options = { runOnly: ruleName };
    var context = {
      exclude: [['#fail1'], ['#fail2', 'iframe']]
    };

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
        axe.testUtils.assertResultsDeepEqual(axeRunPartialResult, axeRunResult);
        done();
      })
      .catch(done);
  });

  it('gives the same failed results as axe.run when context.size and context.focusable are used', function (done) {
    var options = { runOnly: ruleName };
    Promise.all(runPartialRecursive({ exclude: [] }, options))
      .then(function (partialResults) {
        return Promise.all([
          axe.finishRun(partialResults, options),
          axe.run({ exclude: [] }, options)
        ]);
      })
      .then(function (results) {
        var axeRunPartialResult = results[0];
        var axeRunResult = results[1];

        assert.isObject(axeRunPartialResult);
        assert.isObject(axeRunResult);
        // Check the node is the one we expect
        var nodes = axeRunPartialResult.violations[0].nodes;
        assert.lengthOf(nodes, 2);
        assert.deepEqual(nodes[0].target, ['#fail1', 'html']);
        assert.deepEqual(nodes[1].target, ['#fail2', 'iframe', 'html']);

        axe.testUtils.assertResultsDeepEqual(axeRunPartialResult, axeRunResult);
        done();
      })
      .catch(done);
  });
});
