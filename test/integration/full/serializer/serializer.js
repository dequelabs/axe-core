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
    '<iframe id="frame1" src="frames/level1.html"></iframe>\n\n# Inside frame1.contentWindow:\n<html id="level1" lang="@(#$*">',
    '<iframe id="frame1" src="frames/level1.html"></iframe>\n\n# Inside frame1.contentWindow:\n<iframe id="frame2-a" src="level2-a.html"></iframe>\n\n# Inside frame2-a.contentWindow:\n<html id="level2-a" lang="!@£"><head>\n    <meta charset="utf8">\n    <script src="/axe.js"></script>\n    <script src="../custom-source-serializer.js"></script>\n  </head>\n  <body>\n    Hi\n  \n\n</body></html>',
    '<iframe id="frame1" src="frames/level1.html"></iframe>\n\n# Inside frame1.contentWindow:\n<iframe id="frame2-b" src="level2-b.html"></iframe>\n\n# Inside frame2-b.contentWindow:\n<html id="level2-b" xml:lang="$%^"><head>\n    <meta charset="utf8">\n    <script src="/axe.js"></script>\n    <script src="../custom-source-serializer.js"></script>\n  </head>\n  <body>\n\n</body></html>'
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
});
