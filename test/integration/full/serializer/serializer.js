describe('serializer', function () {
  'use strict';
  beforeEach(function (done) {
    axe.testUtils.awaitNestedLoad(function () {
      // Stop messing with my tests Mocha!
      var heading = document.querySelector('#mocha h1');
      if (heading) {
        heading.outerHTML = '<div><b>bypass iframe test fail</b></div>';
      }
      done();
    });
  });

  const runOptions = { runOnly: 'html-lang-valid' };
  const expectedCustomNodeSources = [
    'level0',
    'frame1 > level1',
    'frame1 > frame2-a > level2-a',
    'frame1 > frame2-b > level2-b'
  ];

  it('applies serializer hooks with axe.runPartial/finishRun', function (done) {
    Promise.all(axe.testUtils.runPartialRecursive(document, runOptions))
      .then(function (partialResults) {
        return axe.finishRun(partialResults, runOptions);
      })
      .then(function (results) {
        const nodeHtmls = results.violations[0].nodes.map(n => n.html);
        assert.deepStrictEqual(nodeHtmls, expectedCustomNodeSources);
        done();
      })
      .catch(done);
  });

  it('applies serializer hooks with axe.run', function (done) {
    axe
      .run(document, runOptions)
      .then(function (results) {
        const nodeHtmls = results.violations[0].nodes.map(n => n.html);
        assert.deepStrictEqual(nodeHtmls, expectedCustomNodeSources);
        done();
      })
      .catch(done);
  });

  it('still supports axe.run with options.elementRef', done => {
    axe
      .run(document, { ...runOptions, elementRef: true })
      .then(function (results) {
        const nodeElements = results.violations[0].nodes.map(n => n.element);
        assert.deepStrictEqual(nodeElements, [
          document.querySelector('html'),
          // as usual, elementRef only works for the top frame
          undefined,
          undefined,
          undefined
        ]);
        done();
      })
      .catch(done);
  });
});
