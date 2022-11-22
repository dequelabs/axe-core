describe('color-contrast code highlighting test', function () {
  'use strict';

  var results;
  function run(done) {
    axe.run(
      '#fixture',
      { runOnly: { type: 'rule', values: ['color-contrast'] } },
      function (err, r) {
        assert.isNull(err);
        results = r;
        done();
      }
    );
  }

  before(function (done) {
    // wait for window load event (or if the window has already loaded) so the
    // prism styles have loaded before running the tests (in Chrome the load
    // even was already fired before Mocha starts the test suite)
    if (document.readyState === 'complete') {
      run(done);
    } else {
      window.addEventListener('load', function () {
        run(done);
      });
    }
  });

  describe('violations', function () {
    it('should find issues', function () {
      assert.lengthOf(results.violations, 1);
      assert.lengthOf(results.violations[0].nodes, 32);
    });
  });

  describe('passes', function () {
    it('should find passes', function () {
      assert.lengthOf(results.passes, 1);
      assert.lengthOf(results.passes[0].nodes, 27);
    });
  });

  describe('incomplete', function () {
    it('should find just the code block', function () {
      assert.lengthOf(results.incomplete, 1);
      assert.lengthOf(results.incomplete[0].nodes, 1);
      assert.equal(
        results.incomplete[0].nodes[0].html,
        '<code class=" language-html">'
      );
    });
  });
});
