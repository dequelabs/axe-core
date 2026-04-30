describe('region fail test', () => {
  let results;
  before(done => {
    axe.testUtils.awaitNestedLoad(() => {
      axe.run({ runOnly: { type: 'rule', values: ['region'] } }, (err, r) => {
        assert.isNull(err);
        results = r;
        done();
      });
    });
  });

  describe('violations', () => {
    it('should find one', () => {
      assert.lengthOf(results.violations[0].nodes, 1);
    });

    it('should find wrapper', () => {
      assert.deepEqual(results.violations[0].nodes[0].target, [
        'iframe',
        '#wrapper'
      ]);
    });
  });
});
