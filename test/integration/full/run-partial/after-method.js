describe('run-partial, after-method', () => {
  const ruleName = 'heading-order';
  const runPartialRecursive = axe.testUtils.runPartialRecursive;
  const clone = axe.utils.clone;

  beforeEach(done => {
    axe.testUtils.awaitNestedLoad(done);
  });

  it('gives the same passed results as axe.run with a complex "after" method', done => {
    const options = { runOnly: ruleName };
    const context = { exclude: [] };
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

  it('gives the same failed results as axe.run with a complex "after" method', done => {
    const options = { runOnly: ruleName };
    const context = { exclude: [['#frame1', '#frame1a']] };
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

        assert.isObject(axeRunPartialResult);
        assert.isObject(axeRunResult);
        // Check the node is the one we expect
        const nodes = axeRunPartialResult.violations[0].nodes;
        assert.lengthOf(nodes, 1);
        assert.deepEqual(nodes[0].target, ['#frame1', 'h3']);

        axe.testUtils.assertResultsDeepEqual(axeRunPartialResult, axeRunResult);
        done();
      })
      .catch(done);
  });
});
