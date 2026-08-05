describe('frame-tested-pass test', () => {
  let results;
  before(done => {
    axe.testUtils.awaitNestedLoad(() => {
      axe.run(
        { runOnly: { type: 'rule', values: ['frame-tested'] } },
        (err, r) => {
          assert.isNull(err);
          results = r;
          done();
        }
      );
    });
  });

  describe('passes', () => {
    it('should find 1', () => {
      assert.lengthOf(results.passes[0].nodes, 1);
    });
    it('should find first iframe', () => {
      assert.deepEqual(results.passes[0].nodes[0].target, ['#pass']);
    });
  });

  describe('violations', () => {
    it('should find 0', () => {
      assert.lengthOf(results.violations, 0);
    });
  });

  describe('incomplete', () => {
    it('should find 0', () => {
      assert.lengthOf(results.incomplete, 0);
    });
  });
});
