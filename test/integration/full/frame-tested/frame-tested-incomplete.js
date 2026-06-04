describe('frame-tested-incomplete test', () => {
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

  describe('incomplete', () => {
    it('should find 1', () => {
      assert.lengthOf(results.incomplete[0].nodes, 1);
    });
    it('should find first iframe', () => {
      assert.deepEqual(results.incomplete[0].nodes[0].target, ['#incomplete']);
    });
  });

  describe('violations', () => {
    it('should find 0', () => {
      assert.lengthOf(results.violations, 0);
    });
  });

  describe('passes', () => {
    it('should find 0', () => {
      assert.lengthOf(results.passes, 0);
    });
  });
});
