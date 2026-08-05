describe('run-partial, context-size-focusable', () => {
  const ruleName = 'frame-focusable-content';
  const runPartialRecursive = axe.testUtils.runPartialRecursive;
  const clone = axe.utils.clone;

  beforeEach(done => {
    axe.testUtils.awaitNestedLoad(done);
  });

  it('gives the same passed results as axe.run when context.size and context.focusable are used', done => {
    const options = { runOnly: ruleName };
    const context = {
      exclude: [['#fail1'], ['#fail2', 'iframe']]
    };

    Promise.all(runPartialRecursive(clone(context), options))
      .then(partialResults => {
        return Promise.all([
          axe.finishRun(partialResults, options),
          axe.run(clone(context), options)
        ]);
      })
      .then(results => {
        const axeRunPartialResult = results[0];
        const axeRunResult = results[1];
        assert.lengthOf(axeRunPartialResult.violations, 0);
        axe.testUtils.assertResultsDeepEqual(axeRunPartialResult, axeRunResult);
        done();
      })
      .catch(done);
  });

  it('gives the same failed results as axe.run when context.size and context.focusable are used', done => {
    const options = { runOnly: ruleName };
    Promise.all(runPartialRecursive({ exclude: [] }, options))
      .then(partialResults => {
        return Promise.all([
          axe.finishRun(partialResults, options),
          axe.run({ exclude: [] }, options)
        ]);
      })
      .then(results => {
        const axeRunPartialResult = results[0];
        const axeRunResult = results[1];

        assert.isObject(axeRunPartialResult);
        assert.isObject(axeRunResult);
        // Check the node is the one we expect
        const nodes = axeRunPartialResult.violations[0].nodes;
        assert.lengthOf(nodes, 2);
        assert.deepEqual(nodes[0].target, ['#fail1', 'html']);
        assert.deepEqual(nodes[1].target, ['#fail2', 'iframe', 'html']);

        axe.testUtils.assertResultsDeepEqual(axeRunPartialResult, axeRunResult);
        done();
      })
      .catch(done);
  });
});
