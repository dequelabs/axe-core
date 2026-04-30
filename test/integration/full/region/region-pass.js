describe('region pass test', () => {
  let results;
  before(done => {
    axe.testUtils.awaitNestedLoad(() => {
      axe.run({ runOnly: ['region'] }, (err, r) => {
        assert.isNull(err);
        results = r;
        done();
      });
    });
  });

  describe('passes', () => {
    it('should pass nodes', () => {
      // it seems CircleCI and localhost have different number of DOM nodes,
      // so as long as everything passes and nothing fails, the rule is working
      assert.isTrue(results.passes[0].nodes.length > 0);
    });
  });

  describe('violations', () => {
    it('should find none', () => {
      assert.lengthOf(results.violations, 0);
    });
  });
});
