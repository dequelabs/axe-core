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
    it('should find 2', () => {
      assert.lengthOf(results.incomplete[0].nodes, 2);
    });
    it('should find the iframe and the frame', () => {
      assert.deepEqual(
        results.incomplete[0].nodes.map(node => node.target),
        [['#incomplete'], ['#frameset', '#incomplete']]
      );
    });
  });

  describe('violations', () => {
    it('should find 0', () => {
      assert.lengthOf(results.violations, 0);
    });
  });

  describe('passes', () => {
    it('should find the iframe of the frameset', () => {
      assert.lengthOf(results.passes, 1);
      assert.deepEqual(
        results.passes[0].nodes.map(node => node.target),
        [['#frameset']]
      );
    });
  });
});
