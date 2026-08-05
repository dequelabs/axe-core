describe('landmark-one-main test pass', () => {
  let results;
  before(done => {
    axe.testUtils.awaitNestedLoad(() => {
      axe.run(
        { runOnly: { type: 'rule', values: ['landmark-one-main'] } },
        (err, r) => {
          assert.isNull(err);
          results = r;
          done();
        }
      );
    });
  });

  describe('violations', () => {
    it('should find 0', () => {
      assert.lengthOf(results.violations, 0);
    });
  });

  describe('passes', () => {
    it('should find 4', () => {
      assert.lengthOf(results.passes[0].nodes, 4);
    });

    it('should find #pass1', () => {
      assert.deepEqual(results.passes[0].nodes[0].target, ['#pass1']);
    });

    it('should find #frame1, #pass2', () => {
      assert.deepEqual(results.passes[0].nodes[1].target, [
        '#frame1',
        '#pass2'
      ]);
    });

    it('should find #frame1, #frame2, #pass3', () => {
      assert.deepEqual(results.passes[0].nodes[2].target, [
        '#frame1',
        '#frame2',
        '#pass3'
      ]);
    });

    it('should find #frame1, #frame3, #pass4', () => {
      assert.deepEqual(results.passes[0].nodes[3].target, [
        '#frame1',
        '#frame3',
        '#pass4'
      ]);
    });
  });

  it('should find 0 inapplicable', () => {
    assert.lengthOf(results.inapplicable, 0);
  });

  it('should find 0 incomplete', () => {
    assert.lengthOf(results.incomplete, 0);
  });
});
