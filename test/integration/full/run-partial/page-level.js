describe('run-partial, page-level', () => {
  const ruleName = 'bypass';
  const runPartialRecursive = axe.testUtils.runPartialRecursive;
  const clone = axe.utils.clone;

  beforeEach(done => {
    axe.testUtils.awaitNestedLoad(() => {
      // Stop messing with my tests Mocha!
      const heading = document.querySelector('#mocha h1');
      if (heading) {
        heading.outerHTML = '<div><b>bypass iframe test fail</b></div>';
      }
      done();
    });
  });

  it('gives the same empty results as axe.run with a pageLevel rule', done => {
    const options = { runOnly: ruleName };
    // pageLevel rules are inapplicable when they don't test the entire page
    const context = { include: ['article'] };
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
        assert.lengthOf(axeRunPartialResult.incomplete, 0);
        assert.lengthOf(axeRunPartialResult.passes, 0);
        axe.testUtils.assertResultsDeepEqual(axeRunPartialResult, axeRunResult);
        done();
      })
      .catch(done);
  });

  it('gives the same failed results as axe.run with a pageLevel rule', done => {
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
        assert.isObject(axeRunPartialResult);
        assert.isObject(axeRunResult);

        // Check the node is the one we expect
        const nodes = axeRunPartialResult.incomplete[0].nodes;
        assert.lengthOf(nodes, 1);
        assert.deepEqual(nodes[0].target, ['html']);

        axe.testUtils.assertResultsDeepEqual(axeRunPartialResult, axeRunResult);
        done();
      })
      .catch(done);
  });
});
