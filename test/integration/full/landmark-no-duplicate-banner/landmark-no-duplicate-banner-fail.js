describe('landmark-no-duplicate-banner test failure', () => {
  let results;
  before(done => {
    axe.testUtils.awaitNestedLoad(() => {
      axe.run(
        { runOnly: { type: 'rule', values: ['landmark-no-duplicate-banner'] } },
        (err, r) => {
          assert.isNull(err);
          results = r;
          done();
        }
      );
    });
  });

  describe('violations', () => {
    it('should find 3', () => {
      assert.lengthOf(results.violations[0].nodes, 3);
    });

    it('should find #fail1', () => {
      assert.deepEqual(results.violations[0].nodes[0].target, ['#fail1']);
    });

    it('should find #frame1, #fail2', () => {
      assert.deepEqual(results.violations[0].nodes[1].target, [
        '#frame1',
        '#fail2'
      ]);
    });

    it('should find #frame1, #frame2, #fail3', () => {
      assert.deepEqual(results.violations[0].nodes[2].target, [
        '#frame1',
        '#frame2',
        '#fail3'
      ]);
    });
  });

  describe('passes', () => {
    it('should find 0', () => {
      assert.lengthOf(results.passes, 0);
    });
  });

  it('should find 0 inapplicable', () => {
    assert.lengthOf(results.inapplicable, 0);
  });

  it('should find 0 incomplete', () => {
    assert.lengthOf(results.incomplete, 0);
  });
});
