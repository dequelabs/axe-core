describe('region elementInternals pass test', () => {
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
    it('passes content inside an element with aria-live set via elementInternals', () => {
      const target = results.passes
        .flatMap(r => r.nodes)
        .find(n => n.target.includes('#internals-target'));
      assert.isDefined(target);
    });
  });

  describe('violations', () => {
    it('should find none', () => {
      assert.lengthOf(results.violations, 0);
    });
  });
});
