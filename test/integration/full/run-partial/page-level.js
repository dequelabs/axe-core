describe('run-partial, page-level', function () {
  'use strict';
  let ruleName = 'bypass';
  let runPartialRecursive = axe.testUtils.runPartialRecursive;
  let clone = axe.utils.clone;

  beforeEach(function (done) {
    axe.testUtils.awaitNestedLoad(function () {
      // Stop messing with my tests Mocha!
      let heading = document.querySelector('#mocha h1');
      if (heading) {
        heading.outerHTML = '<div><b>bypass iframe test fail</b></div>';
      }
      done();
    });
  });

  it('gives the same empty results as axe.run with a pageLevel rule', function (done) {
    let options = { runOnly: ruleName };
    // pageLevel rules are inapplicable when they don't test the entire page
    let context = { include: ['article'] };
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
        assert.lengthOf(axeRunPartialResult.incomplete, 0);
        assert.lengthOf(axeRunPartialResult.passes, 0);
        axeRunPartialResult.timestamp = axeRunResult.timestamp;
        axeRunPartialResult.testEnvironment = axeRunResult.testEnvironment;
        assert.deepEqual(axeRunPartialResult, axeRunResult);
        done();
      })
      .catch(done);
  });

  it('gives the same failed results as axe.run with a pageLevel rule', function (done) {
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
        assert.isObject(axeRunPartialResult);
        assert.isObject(axeRunResult);

        // Check the node is the one we expect
        let nodes = axeRunPartialResult.incomplete[0].nodes;
        assert.lengthOf(nodes, 1);
        assert.deepEqual(nodes[0].target, ['html']);

        axeRunPartialResult.timestamp = axeRunResult.timestamp;
        assert.deepEqual(axeRunPartialResult, axeRunResult);
        done();
      })
      .catch(done);
  });
});
