describe('run-partial, initiator', () => {
  const ruleName = 'document-title';
  const runPartialRecursive = axe.testUtils.runPartialRecursive;
  const clone = axe.utils.clone;

  beforeEach(done => {
    axe.testUtils.awaitNestedLoad(done);
  });

  it('gives the same results as axe.run when context.initiator is used', done => {
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
        axeRunPartialResult.testEnvironment = axeRunResult.testEnvironment;
        axeRunPartialResult.timestamp = axeRunResult.timestamp;
        assert.deepEqual(axeRunPartialResult, axeRunResult);
        done();
      })
      .catch(done);
  });
});
