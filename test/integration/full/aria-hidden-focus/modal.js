describe('aria-hidden-focus test', () => {
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
    it('should find 0 violations', () => {
      assert.lengthOf(results.violations, 0);
    });
  });

  describe('passes', () => {
    it('should find 0 passes', () => {
      assert.lengthOf(results.violations, 0);
    });
  });

  describe('incomplete', () => {
    it('should find 1', () => {
      assert.lengthOf(results.incomplete[0].nodes, 1);
    });

    it('should find #incomplete1', () => {
      assert.deepEqual(results.incomplete[0].nodes[0].target, ['#incomplete1']);
    });
  });
});
