describe('target-size shadow dom test', () => {
  let results;

  before(done => {
    axe.testUtils.awaitNestedLoad(async () => {
      const options = {
        runOnly: ['target-size'],
        elementRef: true
      };
      const context = {
        // ignore the mocha links
        exclude: '#mocha'
      };
      results = await axe.run(context, options);
      done();
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
