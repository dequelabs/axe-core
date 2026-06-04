describe('target-size position: fixed and scrolled', () => {
  let results;

  before(done => {
    axe.testUtils.awaitNestedLoad(() => {
      window.scrollTo(0, document.body.scrollHeight);
      const options = {
        runOnly: ['target-size'],
        elementRef: true
      };
      const context = {
        // ignore the mocha links
        exclude: '#mocha'
      };
      axe.run(context, options, (err, r) => {
        if (err) {
          return done(err);
        }
        results = r;
        done();
      });
    });
  });

  describe('violations', () => {
    it('should find 0', () => {
      assert.lengthOf(results.violations, 0);
    });
  });

  describe('passes', () => {
    it('should find 2', () => {
      assert.lengthOf(results.passes[0].nodes, 2);
    });
  });

  it('should find 0 inapplicable', () => {
    assert.lengthOf(results.inapplicable, 0);
  });

  it('should find 0 incomplete', () => {
    assert.lengthOf(results.incomplete, 0);
  });
});
