describe('aria-hidden-focus pass test', () => {
  let results;
  before(done => {
    axe.testUtils.awaitNestedLoad(() => {
      axe.run(
        { runOnly: { type: 'rule', values: ['aria-hidden-focus'] } },
        (err, r) => {
          assert.isNull(err);
          results = r;
          done();
        }
      );
    });
  });

  describe('violations', () => {
    it('should find none', () => {
      assert.lengthOf(results.violations, 0);
    });
  });
});
