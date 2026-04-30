describe('color-contrast code highlighting test', () => {
  let results;
  function run(done) {
    axe.run(
      '#fixture',
      { runOnly: { type: 'rule', values: ['color-contrast'] } },
      (err, r) => {
        assert.isNull(err);
        results = r;
        done();
      }
    );
  }

  before(done => {
    // wait for window load event (or if the window has already loaded) so the
    // prism styles have loaded before running the tests (in Chrome the load
    // even was already fired before Mocha starts the test suite)
    if (document.readyState === 'complete') {
      run(done);
    } else {
      window.addEventListener('load', () => {
        run(done);
      });
    }
  });

  describe('violations', () => {
    it('should find issues', () => {
      assert.lengthOf(results.violations, 1);
      assert.lengthOf(results.violations[0].nodes, 32);
    });
  });

  describe('passes', () => {
    it('should find passes', () => {
      assert.lengthOf(results.passes, 1);
      assert.lengthOf(results.passes[0].nodes, 28);
    });
  });

  describe('incomplete', () => {
    it('should find 0 incomplete', () => {
      assert.lengthOf(results.incomplete, 0);
    });
  });
});
